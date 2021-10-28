import { JWTPayload } from '@/auth/auth.dto';
import { BadRequest } from '@/error';
import { UserModelName } from '@/user/user.schema';
import { RequestHandler } from 'express';
import { WLModel } from './watchlist.schema';

export const addToWatchList: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const { product } = req.body;
    if (!product) return next(new BadRequest('PRODUCT'));
    const wl = await WLModel.create({
      user: id,
      product,
    });
    res.json(wl);
  } catch (e) {
    next(e);
  }
};

export const getWatchListProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const wl = await WLModel.find({
      user: id,
    }).populate({
      path: 'product',
      populate: { path: 'currentBidder', model: UserModelName },
    });
    res.json(wl);
  } catch (e) {
    next(e);
  }
};

export default { addToWatchList, getWatchListProduct };
