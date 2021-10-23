import mongoose from 'mongoose';
import { RequestHandler } from 'express';

import { ProductDoc } from '@/product/product.schema';
import { UserDoc } from '@/user/user.schema';
import { CreateBidDTO } from './bid.dto';
import BidService from './bid.service';

const bid: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const bidProduct: ProductDoc = res.locals.product;
    const bidder: UserDoc = res.locals.user;
    const seller: UserDoc = bidProduct.seller;
    const { price, maxAutoPrice }: CreateBidDTO = req.body;

    const currentBid = await BidService.findCurrentPriceBid(
      price,
      bidProduct._id,
      session,
    );

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

    bidProduct.bidCount += 1;
    bidProduct.currentPrice = bid.price;
    await bidProduct.save({ session });

    await session.commitTransaction();
    await session.endSession();

    await BidService.sendPlaceBidEmail(
      bid,
      bidProduct,
      seller,
      bidder,
      currentBid?.bidder,
    );
    res.json({ bid, product: bidProduct });
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
    next(e);
  }
};

export default {
  bid,
};
