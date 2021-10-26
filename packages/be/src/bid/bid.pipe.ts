import { RequestHandler } from 'express';
import { BadRequest } from '@/error';
import { parseBoolean, safePositive } from '@/utils/parser';
import { notEmpty, notNull, numberBetWeenRange } from '@/utils/validator';
import { CreateBidDTO } from './bid.dto';

export const bidValidator: RequestHandler = (req, res, next) => {
  const {
    product,
    price, // toPositve
    maxAutoPrice, // toPositive
  }: CreateBidDTO = req.body;
  if (!notEmpty(product)) {
    return next(new BadRequest('PRODUCT'));
  }

  const [safePrice, priceValue] = safePositive(price);
  if (!safePrice) {
    return next(new BadRequest('PRICE'));
  }
  req.body.price = priceValue;

  if (!maxAutoPrice) {
    const [safeAutoPrice, autoPriceValue] = safePositive(maxAutoPrice);
    if (!safeAutoPrice && numberBetWeenRange(autoPriceValue, priceValue)) {
      return next(new BadRequest('AUTO_PRICE'));
    }
    req.body.maxAutoPrice = autoPriceValue;
  }

  next();
};
