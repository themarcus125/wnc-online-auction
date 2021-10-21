import { RequestHandler } from 'express';

export const winnerRateSeller: RequestHandler = (req, res, next) => {
  try {
    next();
  } catch (e) {
    next(e);
  }
};
