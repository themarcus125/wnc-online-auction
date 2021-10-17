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
    expiredIn,
    isAutoRenew, // canEmpty, toBoolean
    allowNoRatingBid, // canEmpty, toBoolean
  }: RawCreateProductRequestDTO = body;

  if (!notEmpty(description)) {
    return 'DESC';
  }
  body.descriptions = [description];

  if (!length(name, 1, 30)) {
    return 'NAME';
  }

  if (!notEmpty(category)) {
    return 'CAT';
  }

  const [safeStartPrice, startPriceValue] = safePositive(startPrice);
  if (!safeStartPrice) {
    return 'S_PRICE';
  }
  body.startPrice = startPriceValue;

  const [safeStepPrice, stepPriceValue] = safePositive(stepPrice);
  if (!safeStepPrice) {
    return 'STP_PRICE';
  }
  body.stepPrice = stepPriceValue;

  if (notEmpty(buyPrice)) {
    const [safeBuyPrice, buyPriceValue] = safePositive(buyPrice);
    if (!safeBuyPrice) {
      return 'B_PRICE';
    }
    body.buyPrice = buyPriceValue;
  }

  if (!validateInt(undefined, 24)(expiredIn)) {
    return 'EXP_HOUR';
  }

  if (notEmpty(isAutoRenew)) {
    const parsedIsAutoRenew = parseBoolean(isAutoRenew);
    if (!notNull(parsedIsAutoRenew)) {
      return 'AUTO_RENEW';
    }
    body.isAutoRenew = parsedIsAutoRenew;
  }

  if (notEmpty(allowNoRatingBid)) {
    const parsedAllowNoRatingBid = parseBoolean(allowNoRatingBid);
    if (!notNull(parsedAllowNoRatingBid)) {
      return 'ALLOW_RATING';
    }
    body.allowNoRatingBid = parsedAllowNoRatingBid;
  }

  return null;
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
