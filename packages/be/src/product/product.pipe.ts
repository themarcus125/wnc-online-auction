import { BadRequest } from '@/error';
import { removeAll } from '@/utils/file';
import { parseBoolean, safePositive } from '@/utils/parser';
import { length, notEmpty, notNull, validateInt } from '@/utils/validator';
import { RequestHandler } from 'express';
import { RawCreateProductRequestDTO } from './product.dto';

export const transformCreateProductBody = (body: any) => {
  const {
    name,
    description, // toArray
    category,
    startPrice, // toPositive
    stepPrice, // toPositive
    buyPrice, // canEmpty, toPositive
    expiredIn, // toInt
    isAutoRenew, // canEmpty, toBoolean
    onlyRatedBidder, // canEmpty, toBoolean
  }: RawCreateProductRequestDTO = body;

  if (!notEmpty(description)) {
    return 'DESC';
  }
  body.descriptions = [description];

  if (!length(name, 1, 300)) {
    return 'NAME';
  }

  if (!notEmpty(category)) {
    return 'CAT';
  }

  if (!notEmpty(startPrice)) {
    return 'S_PRICE';
  }
  const [safeStartPrice, startPriceValue] = safePositive(startPrice);
  if (!safeStartPrice) {
    return 'S_PRICE';
  }
  body.startPrice = startPriceValue;

  if (!notEmpty) {
    return 'STP_PRICE';
  }
  const [safeStepPrice, stepPriceValue] = safePositive(stepPrice);
  if (!safeStepPrice) {
    return 'STP_PRICE';
  }
  body.stepPrice = stepPriceValue;

  if (!notEmpty(buyPrice)) {
    body.buyPrice = undefined;
  } else {
    const [safeBuyPrice, buyPriceValue] = safePositive(buyPrice);
    if (!safeBuyPrice) {
      return 'B_PRICE';
    }
    body.buyPrice = buyPriceValue;
  }

  if (!notEmpty(expiredIn) || !validateInt(undefined, 24)(expiredIn)) {
    return 'EXP_HOUR';
  }

  if (!notEmpty(isAutoRenew)) {
    body.isAutoRenew = undefined;
  } else {
    const parsedIsAutoRenew = parseBoolean(isAutoRenew);
    if (!notNull(parsedIsAutoRenew)) {
      return 'AUTO_RENEW';
    }
    body.isAutoRenew = parsedIsAutoRenew;
  }

  if (!notEmpty(onlyRatedBidder)) {
    body.onlyRatedBidder = undefined;
  } else {
    const parsedOnlyRatedBidder = parseBoolean(onlyRatedBidder);
    if (!notNull(parsedOnlyRatedBidder)) {
      return 'ALLOW_RATING';
    }
    body.onlyRatedBidder = parsedOnlyRatedBidder;
  }

  return null;
};

export const mapImagesToBody: RequestHandler = (req, res, next) => {
  const files = req.files as Express.Multer.File[];
  const filePaths = files.map((file) => `${file.destination}/${file.filename}`);
  if (!length(files, 3)) {
    removeAll(filePaths);
    return next(new BadRequest('INVALID_AVATAR_OR_SUBIMAGES'));
  }
  req.body.images = filePaths;
  next();
};
