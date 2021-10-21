import { BadRequest } from '@/error';
import { parseBoolean } from '@/utils/parser';
import { notEmpty, notNull } from '@/utils/validator';
import { RequestHandler } from 'express';
import { CreateRatingDTO } from './rating.dto';

export const rateSellerValidation: RequestHandler = (req, res, next) => {
  const { targetUser, feedback, score }: CreateRatingDTO = req.body;
  if (!notEmpty(targetUser)) {
    next(new BadRequest('INVALID_TARGET_USER'));
  }
  if (!notEmpty(feedback)) {
    next(new BadRequest('INVALID_FEEDBACK'));
  }
  if (!notNull(parseBoolean(score))) {
    next(new BadRequest('INVALID_SCORE'));
  }
  next();
};
