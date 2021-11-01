import { RequestHandler } from 'express';
import { BadRequest } from '@/error';
import { safePositive } from '@/utils/parser';
import { notEmpty, numberBetWeenRange } from '@/utils/validator';
import { CreateBidDTO } from './bid.dto';

export const bidValidator: RequestHandler = (req, res, next) => {
  const {
    product,
    price, // toPositve
    maxAutoPrice, // canEmpty, toPositive
  }: CreateBidDTO = req.body;
  if (!notEmpty(product)) {
    return next(new BadRequest('PRODUCT'));
  }

  if (!notEmpty(price)) return next(new BadRequest('PRICE'));
  const [safePrice, priceValue] = safePositive(price);
  if (!safePrice) {
    return next(new BadRequest('PRICE'));
  }
  req.body.price = priceValue;

  if (!notEmpty(maxAutoPrice)) {
    req.body.maxAutoPrice = undefined;
  } else {
    const [safeAutoPrice, autoPriceValue] = safePositive(maxAutoPrice);
    if (!safeAutoPrice || !numberBetWeenRange(autoPriceValue, priceValue)) {
      return next(new BadRequest('AUTO_PRICE'));
    }
    req.body.maxAutoPrice = autoPriceValue;
  }

  next();
};
