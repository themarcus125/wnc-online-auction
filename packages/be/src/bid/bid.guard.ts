import { RequestHandler } from 'express';
import mongoose from 'mongoose';

import { Forbidden, NotFound } from '@/error';
import { JWTPayload } from '@/auth/auth.dto';
import ProductService from '@/product/product.service';
import { excludeString, UserDoc } from '@/user/user.schema';
import { CreateBidDTO } from './bid.dto';
import BidService from './bid.service';
import { ProductDoc } from '@/product/product.schema';
import { BidStatus } from './bid.schema';

export const placeBidGuard: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();
  const { id }: JWTPayload = res.locals.jwtPayload;
  const { product, price, maxAutoPrice }: CreateBidDTO = req.body;
  try {
    const bidProduct = await ProductService.findById(product)
      .populate('seller', excludeString)
      .populate('currentBidder', excludeString)
      .session(session);
    if (!bidProduct) {
      return next(new NotFound('PRODUCT_NOT_FOUND'));
    }

    const productCanBid = BidService.productCanPlaceBid(bidProduct);
    if (!productCanBid) {
      return next(new Forbidden('PRODUCT_CAN_NOT_BID'));
    }

    const bidder: UserDoc = res.locals.user;
    if (!bidder) {
      return next(new NotFound('BIDDER_NOT_FOUND'));
    }
    const bidderRejected = await BidService.checkBidderRejected(
      bidder._id,
      product,
    );
    if (bidderRejected) {
      return next(new Forbidden('REJECTED_BIDDER'));
    }
    const checkCanBid = await BidService.checkCanPlaceBid(bidProduct, bidder, {
      bidder: id,
      product,
      price,
      maxAutoPrice,
    });
    if (!checkCanBid) {
      return next(new Forbidden('CAN_NOT_BID'));
    }

    res.locals.product = bidProduct;
    res.locals.session = session;
    next();
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
    next(e);
  }
};

export const rejectBidGuard: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();
  const { id }: JWTPayload = res.locals.jwtPayload;
  const { bidId } = req.params;
  try {
    const bid = await BidService.findOne({
      _id: bidId,
      status: BidStatus.NORMAL,
    })
      .populate('product')
      .session(session);
    if (!bid) return next(new NotFound('BID'));
    const product: ProductDoc = bid.product;
    if (!product) return next(new NotFound('PRODUCT'));
    if (product.seller !== id) return next(new Forbidden('SELLER'));

    res.locals.bid = bid;
    res.locals.product = product;
    res.locals.session = session;
    next();
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
    next(e);
  }
};
