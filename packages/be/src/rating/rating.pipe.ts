import { BadRequest } from '@/error';
import { notEmpty, notNull } from '@/utils/validator';
import { RequestHandler } from 'express';
import { CreateRatingDTO } from './rating.dto';

export const rateSellerValidator: RequestHandler = (req, res, next) => {
  const { targetUser, feedback, score }: CreateRatingDTO = req.body;
  if (!notEmpty(targetUser)) {
    return next(new BadRequest('INVALID_TARGET_USER'));
  }
  if (!notEmpty(feedback)) {
    return next(new BadRequest('INVALID_FEEDBACK'));
  }
  if (!notNull(score)) {
    return next(new BadRequest('INVALID_SCORE'));
  }
  next();
};
