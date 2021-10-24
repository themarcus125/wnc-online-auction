import { Forbidden } from '@/error';
import ProductService from '@/product/product.service';
import { RequestHandler } from 'express';
import { CreateRatingDTO } from './rating.dto';

export const winnerRateGuard: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const { targetUser }: CreateRatingDTO = req.body;
    const isWinner = await ProductService.model.exists({
      expiredAt: {
        $lt: new Date(),
      },
      seller: targetUser,
      currentBidder: id,
    });
    if (!isWinner) {
      throw new Forbidden('NOT_A_WINNER');
    }
    next();
  } catch (e) {
    next(e);
  }
};

export const sellerRateGuard: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const { targetUser }: CreateRatingDTO = req.body;
    const isWinner = await ProductService.model.exists({
      expiredAt: {
        $lt: new Date(),
      },
      seller: id,
      currentBidder: targetUser,
    });
    if (!isWinner) {
      throw new Forbidden('NOT_A_WINNER');
    }
    next();
  } catch (e) {
    next(e);
  }
};
