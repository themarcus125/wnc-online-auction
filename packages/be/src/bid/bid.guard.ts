import { RequestHandler } from 'express';
import { Forbidden, NotFound } from '@/error';
import { JWTPayload } from '@/auth/auth.dto';
import ProductService from '@/product/product.service';
import { UserDoc } from '@/user/user.schema';
import { CreateBidDTO } from './bid.dto';
import BidService from './bid.service';

export const bidGuard: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const { product, price, maxAutoPrice }: CreateBidDTO = req.body;
    const bidProduct = await ProductService.findById(product);
    if (!bidProduct) {
      return next(new NotFound('PRODUCT_NOT_FOUND'));
    }
    const productCanBid = await BidService.productCanBid(bidProduct);
    if (!productCanBid) {
      return next(new Forbidden('PRODUCT_CAN_NOT_BID'));
    }
    const bidder: UserDoc = res.locals.users;
  } catch (e) {
    next(e);
  }
};
