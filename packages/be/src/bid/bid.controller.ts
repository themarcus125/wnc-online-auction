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
    const isProductOfSeller = await ProductService.model.exists({
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
      await BidService.model.create(
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
      throw new Error('CAN_NOT_CREATE_BID');
    }

    const newExpiredAt = ProductService.getAutoRenewDate(bidProduct);
    const updatedProduct = await ProductService.model
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

    const [afterAutoProduct, holdThePrice] = await BidService.autoBidHandler(
      bidProduct,
      currentBid,
      bid,
      session,
    );

    await session.commitTransaction();
    await session.endSession();

    ScheduleService.reschedule(bidProduct._id, newExpiredAt);
    await BidService.sendPlaceBidEmail(
      bid,
      updatedProduct,
      seller,
      bidder,
      bidProduct.currentBidder,
    );
    res.json({
      bid,
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
    if (id === product.seller) {
      return next(new Forbidden('SELLER'));
    }
    if (!(await BidService.checkRating(product, bidder))) {
      return next(new Forbidden('RATING'));
    }
    await BidService.model.create(
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
    );
    const buyProduct = await ProductService.model
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
    await session.commitTransaction();
    await session.endSession();
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
    await BidService.model
      .updateMany(
        {
          product: product._id,
          bidder: bid._id,
        },
        {
          status: BidStatus.REJECTED,
        },
      )
      .session(session);
    if (bid.bidder === product.currentBidder) {
      const prevBid = await BidService.findOne({
        product: product._id,
        status: BidStatus.NORMAL,
      })
        .sort({ price: -1, _id: -1 })
        .session(session);
      const bidder = prevBid?.bidder || null;
      const price = prevBid?.price || product.startPrice;
      await ProductService.model
        .findByIdAndUpdate(product._id, {
          currentBidder: bidder,
          currentPrice: price,
        })
        .session(session);
    }
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
