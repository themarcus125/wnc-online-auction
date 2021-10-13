import { removeAll } from '@/utils/file';
import { safePositive } from '@/utils/parser';
import { length, notNull, validateInt } from '@/utils/validator';
import { RequestHandler } from 'express';
import { CreateProductRequestDTO } from './product.dto';

export const validateCreateProductBody = (body: any) => {
  const {
    name,
    description,
    category,
    startPrice,
    stepPrice,
    buyPrice,
    expiredIn,
  } = body;
  if (!notNull(description)) {
    return 'DESC';
  }
  body.descriptions = [description];
  if (!length(name, 1, 30)) {
    return 'NAME';
  }
  if (!notNull(category)) {
    return 'CAT';
  }
  const [safeStartPrice, startPriceValue] = safePositive(startPrice);
  if (!safeStartPrice) {
    return 'SPRICE';
  }
  body.startPrice = startPriceValue;
  const [safeStepPrice, stepPriceValue] = safePositive(stepPrice);
  if (!safeStepPrice) {
    return 'STPRICE';
  }
  body.stepPrice = stepPriceValue;
  if (notNull(buyPrice)) {
    const [safeBuyPrice, buyPriceValue] = safePositive(buyPrice);
    if (!safeBuyPrice) {
      return 'BPRICE';
    }
    body.buyPrice = buyPriceValue;
  }
  if (!validateInt(undefined, 24)(expiredIn)) {
    return 'EXP_HOUR';
  }
  return 'VALID';
};

export const createProductValidator: RequestHandler = (req, res, next) => {
  if (!notNull(req.body.description)) {
    return res.status(400).json({
      error: 'INVALID_DESC',
    });
  }
  req.body.descriptions = [req.body.description];
  const {
    name,
    category,
    startPrice,
    stepPrice,
    buyPrice,
    expiredIn,
  }: CreateProductRequestDTO = req.body;
  if (!length(name, 1, 30)) {
    return res.status(400).json({
      error: 'INVALID_NAME',
    });
  }
  if (!notNull(category)) {
    return res.status(400).json({
      error: 'INVALID_CAT',
    });
  }
  const [safeStartPrice, startPriceValue] = safePositive(startPrice);
  if (!safeStartPrice) {
    return res.status(400).json({
      error: 'INVALID_START_PRICE',
    });
  }
  req.body.startPrice = startPriceValue;
  const [safeStepPrice, stepPriceValue] = safePositive(stepPrice);
  if (!safeStepPrice) {
    return res.status(400).json({
      error: 'INVALID_STEP_PRICE',
    });
  }
  req.body.stepPrice = stepPriceValue;
  if (notNull(buyPrice)) {
    const [safeBuyPrice, buyPriceValue] = safePositive(buyPrice);
    if (!safeBuyPrice) {
      return res.status(400).json({
        error: 'INVALID_BUY_PRICE',
      });
    }
    req.body.buyPrice = buyPriceValue;
  }
  if (!validateInt(undefined, 24)(expiredIn)) {
    return res.status(400).json({
      error: 'INVALID_EXPIRED_TIME_HOUR',
    });
  }
  next();
};

export const mapImagesToBody: RequestHandler = (req, res, next) => {
  const files = req.files as Express.Multer.File[];
  const filePaths = files.map((file) => `${file.destination}/${file.filename}`);
  if (!length(files, 3)) {
    removeAll(filePaths);
    return res.status(400).json({
      error: 'INVALID_AVATAR_OR_SUBIMAGES',
    });
  }
  req.body.images = filePaths;
  next();
};
