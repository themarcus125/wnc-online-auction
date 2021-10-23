import { RequestHandler } from 'express';

import { Forbidden, NotFound } from '@/error';
import { JWTPayload } from '@/auth/auth.dto';
import ProductService from '@/product/product.service';
import { excludeString, UserDoc } from '@/user/user.schema';
import { CreateBidDTO } from './bid.dto';
import BidService from './bid.service';

export const placeBidGuard: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const { product, price, maxAutoPrice }: CreateBidDTO = req.body;

    const bidProduct = await ProductService.findById(product).populate(
      'seller',
      excludeString,
    );
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
      bidProduct._id,
    );
    if (bidderRejected) {
      return next(new Forbidden('REJECTED_BIDDER'));
    }
    const checkCanBid = BidService.checkCanPlaceBid(bidProduct, bidder, {
      bidder: id,
      product,
      price,
      maxAutoPrice,
    });
    if (!checkCanBid) {
      return next(new Forbidden('CAN_NOT_BID'));
    }

    res.locals.product = bidProduct;
    next();
  } catch (e) {
    next(e);
  }
};
