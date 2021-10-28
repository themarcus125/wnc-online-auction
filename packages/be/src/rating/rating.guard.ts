import { Forbidden } from '@/error';
import { ProductStatus } from '@/product/product.schema';
import ProductService from '@/product/product.service';
import { RequestHandler } from 'express';
import { CreateRatingDTO } from './rating.dto';

export const winnerRateGuard: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const { targetUser }: CreateRatingDTO = req.body;
    const { productId } = req.params;
    const isValidWinProduct = await ProductService.getModel().exists({
      _id: productId,
      seller: targetUser,
      currentBidder: id,
      winnerRating: {
        $exists: false,
      },
      $or: [
        {
          expiredAt: {
            $lt: new Date(),
          },
        },
        {
          status: ProductStatus.SOLD,
        },
      ],
    });
    if (!isValidWinProduct) {
      throw new Forbidden('NOT_A_VALID_WIN_PRODUCT');
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
    const { productId } = req.params;
    const isValidWinProduct = await ProductService.getModel().exists({
      _id: productId,
      seller: id,
      currentBidder: targetUser,
      sellerRating: {
        $exists: false,
      },
      $or: [
        {
          expiredAt: {
            $lt: new Date(),
          },
        },
        {
          status: ProductStatus.SOLD,
        },
      ],
    });
    if (!isValidWinProduct) {
      throw new Forbidden('NOT_A_VALID_WIN_PRODUCT');
    }
    next();
  } catch (e) {
    next(e);
  }
};
