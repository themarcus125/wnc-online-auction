import { length, notNull } from '@/utils/validator';
import { RequestHandler } from 'express';
import { CreateProductDTO } from './product.dto';

export const createProductValidator: RequestHandler = (req, res, next) => {
  const {
    name,
    descriptions,
    category,
    images,
    startPrice,
    stepPrice,
    expiredIn,
  }: CreateProductDTO = req.body;
  if (!length(name, 1, 30)) {
    return res.status(400).json({
      error: 'INVALID_NAME',
    });
  }
  if (!length(descriptions, 1, 1)) {
    return res.status(400).json({
      error: 'INVALID_DESC',
    });
  }
  if (!notNull(category)) {
    return res.status(400).json({
      error: 'INVALID_CAT',
    });
  }
  if (!length(images, 4)) {
    return res.status(400).json({
      error: 'INVALID_AVATAR_OR_SUBIMAGES',
    });
  }
  if (!notNull(startPrice)) {
    return res.status(400).json({
      error: 'INVALID_START_PRICE',
    });
  }
  if (!notNull(stepPrice)) {
    return res.status(400).json({
      error: 'INVALID_STEP_PRICE',
    });
  }
  if (!notNull(expiredIn)) {
    return res.status(400).json({
      error: 'INVALID_EXPIRED_TIME',
    });
  }
  next();
};
