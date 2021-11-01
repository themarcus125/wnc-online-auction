import { JWTPayload } from '@/auth/auth.dto';
import { UserModelName } from '@/db/modelName';
import { BadRequest } from '@/error';
import { RequestHandler } from 'express';
import { WLModel } from './watchlist.schema';

const addToWatchList: RequestHandler = async (req, res, next) => {
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

const removeWatchList: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const { wlId } = req.params;
    const wl = await WLModel.findOneAndDelete({
      _id: wlId,
      user: id,
    });
    res.json(wl);
  } catch (e) {
    next(e);
  }
};

const getWatchListProduct: RequestHandler = async (req, res, next) => {
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

export default { addToWatchList, getWatchListProduct, removeWatchList };
