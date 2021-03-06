import mongoose, { ClientSession } from 'mongoose';
import { RequestHandler } from 'express';

import { ProductDoc, ProductStatus } from '@/product/product.schema';
import { excludeString, UserDoc } from '@/user/user.schema';
import { CreateBidDTO } from './bid.dto';
import BidService from './bid.service';
import ProductService from '@/product/product.service';
import ScheduleService from '@/schedule/schedule.service';
import { JWTPayload } from '@/auth/auth.dto';
import { Forbidden, NotFound } from '@/error';
import { BidDoc, BidStatus } from './bid.schema';
import {
  ioEmitter,
  placedBidEmitter,
  rejectedBidEmitter,
} from '@/web-socket/io.emitter';

const getBidHistory: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const bids = await BidService.modeFind('history', { product: productId });
    res.json(bids);
  } catch (e) {
    next(e);
  }
};

const getSellerBidHistory: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const { productId } = req.params;
    const isProductOfSeller = await ProductService.getModel().exists({
      _id: productId,
      seller: id,
    });
    if (!isProductOfSeller) {
      return next(new Forbidden('PRODUCT_SELLER'));
    }
    const bids = await BidService.modeFind('sellerHistory', {
      product: productId,
    });
    res.json(bids);
  } catch (e) {
    next(e);
  }
};

const getBidderBidHistory: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const { productId } = req.params;
    const bids = await BidService.modeFind('bidderHistory', {
      product: productId,
      bidder: id,
    });
    res.json(bids);
  } catch (e) {
    next(e);
  }
};

const getBid: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const { bidId } = req.params;
    const bid = await BidService.findOne({
      _id: bidId,
      $or: [{ seller: id }, { bidder: id }],
    });
    if (!bid) {
      return next(new Forbidden('BID'));
    }
    res.json(bid);
  } catch (e) {
    next(e);
  }
};

const placeBid: RequestHandler = async (req, res, next) => {
  const session: ClientSession = res.locals.session;
  try {
    const bidProduct: ProductDoc = res.locals.product;
    const bidder: UserDoc = res.locals.user;
    const seller: UserDoc = bidProduct.seller;
    const { price, maxAutoPrice }: CreateBidDTO = req.body;
    const currentBid = await BidService.currentBid(bidProduct).session(session);

    const bid = (
      await BidService.getModel().create(
        [
          {
            product: bidProduct._id,
            bidder: bidder._id,
            price,
            maxAutoPrice,
          },
        ],
        { session },
      )
    )[0];
    if (!bid) {
      throw new Error('CREATE_BID');
    }
    const newExpiredAt = ProductService.getAutoRenewDate(bidProduct);
    const updatedProduct = await ProductService.getModel()
      .findByIdAndUpdate(
        bidProduct._id,
        {
          $inc: {
            bidCount: 1,
          },
          currentPrice: bid.price,
          currentBidder: bid.bidder,
          expiredAt: newExpiredAt,
          $addToSet: {
            bidder: bid.bidder,
          },
        },
        { returnOriginal: false },
      )
      .populate('currentBidder', excludeString)
      .populate('seller', excludeString)
      .session(session);

    if (!updatedProduct) {
      throw new Error('UPDATE_PRODUCT');
    }

    const [holdThePrice, afterAutoProduct, autoBid] =
      await BidService.autoBidHandler(bidProduct, currentBid, bid, session);

    await session.commitTransaction();
    await session.endSession();

    ScheduleService.reschedule(bidProduct._id, newExpiredAt);
    await BidService.sendPlaceBidEmail(
      bid,
      bidProduct,
      seller,
      bidder,
      bidProduct.currentBidder,
    );
    placedBidEmitter({
      bid,
      autoBid,
      product: afterAutoProduct || updatedProduct,
      holdThePrice,
    });
    res.json({
      bid,
      autoBid,
      product: afterAutoProduct || updatedProduct,
      holdThePrice,
    });
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
    next(e);
  }
};

const buyNow: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const bidder: UserDoc = res.locals.user;
    const { productId } = req.body;
    const product = await ProductService.findById(productId).session(session);
    if (!product) {
      return next(new NotFound('PRODUCT_NOT_FOUND'));
    }
    const currentBid = await BidService.currentBid(product).session(session);
    const productCanBuy = await BidService.productCanBuyNow(
      product,
      currentBid,
    );
    if (!productCanBuy) {
      return next(new Forbidden('PRODUCT_CAN_NOT_BUY'));
    }
    if (id.toString() === product.seller.toString()) {
      return next(new Forbidden('SELLER'));
    }
    if (!(await BidService.checkRating(product, bidder))) {
      return next(new Forbidden('RATING'));
    }
    const buyNowBid = (
      await BidService.getModel().create(
        [
          {
            price: product.buyPrice,
            product: product._id,
            bidder: id,
          },
        ],
        {
          session,
        },
      )
    )[0];
    if (!buyNowBid) {
      throw new Error('CREATE_BID');
    }
    const buyProduct = await ProductService.getModel()
      .findByIdAndUpdate(product._id, {
        $inc: {
          bidCount: 1,
        },
        currentPrice: product.buyPrice,
        currentBidder: id,
        $addToSet: {
          bidder: id,
        },
        status: ProductStatus.SOLD,
      })
      .session(session);
    if (!buyProduct) {
      throw new Error('UPDATE_PRODUCT');
    }

    await session.commitTransaction();
    await session.endSession();

    await BidService.sendBuyNowMail(bidder, product, currentBid);
    placedBidEmitter(
      {
        bid: buyNowBid,
        autoBid: null,
        product: buyProduct,
        holdThePrice: false,
      },
      true,
    );
    res.json(buyProduct);
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
    next(e);
  }
};

const rejectBid: RequestHandler = async (req, res, next) => {
  const session: ClientSession = res.locals.session;
  try {
    const bid: BidDoc = res.locals.bid;
    const product: ProductDoc = res.locals.product;
    await BidService.getModel()
      .updateMany(
        {
          product: product._id,
          bidder: bid.bidder,
        },
        {
          status: BidStatus.REJECTED,
        },
      )
      .session(session);

    const response: { bid: BidDoc; product: ProductDoc } = {
      bid,
      product,
    };
    if (bid.bidder.toString() === product.currentBidder.toString()) {
      const prevBid = await BidService.findOne({
        product: product._id,
        status: BidStatus.NORMAL,
      })
        .sort({ price: -1, _id: -1 })
        .session(session);
      const bidder = prevBid?.bidder || null;
      const price = prevBid?.price || product.startPrice;
      const updatedProduct = await ProductService.getModel()
        .findByIdAndUpdate(
          product._id,
          {
            currentBidder: bidder,
            currentPrice: price,
          },
          {
            returnOriginal: false,
          },
        )
        .session(session);
      if (!updatedProduct) throw new Error('UPDATE_PRODUCT');
      response.product = updatedProduct;
    }

    await session.commitTransaction();
    await session.endSession();

    await BidService.sendRejectMail(bid.bidder, product);
    rejectedBidEmitter(response);
    res.json(response);
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
    next(e);
  }
};

export default {
  placeBid,
  buyNow,
  getBid,
  getBidHistory,
  getBidderBidHistory,
  getSellerBidHistory,
  rejectBid,
};
