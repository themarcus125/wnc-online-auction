import ProductService from '@/product/product.service';
import { RequestHandler } from 'express';
import { CreateRatingDTO } from './rating.dto';
import RatingService from './rating.service';
import { excludeString } from '@/user/user.schema';

export const getRatings: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const ratings = await RatingService.find({
      targetUser: id,
    })
      .populate('createUser', 'name')
      .populate('product', 'name');
    res.json(ratings);
  } catch (e) {
    next(e);
  }
};

export const getScore: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const [total, pos, neg] = await RatingService.countScore(userId);
    res.json({
      total,
      pos,
      neg,
    });
  } catch (e) {
    next();
  }
};

export const createRating =
  (isSeller: boolean = true): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = res.locals.jwtPayload;
      const { productId } = req.params;
      const { targetUser, feedback, score }: CreateRatingDTO = req.body;
      const rating = await RatingService.create({
        createUser: id,
        targetUser,
        product: productId,
        feedback,
        score,
      });
      const updatedProduct = await ProductService.getModel()
        .findByIdAndUpdate(
          productId,
          isSeller
            ? { sellerRating: rating._id }
            : { winnerRating: rating._id },
          { returnOriginal: false },
        )
        .populate('currentBidder', excludeString)
        .populate('seller', excludeString);
      res.json({
        rating,
        updatedProduct,
      });
    } catch (e) {
      next(e);
    }
  };

export default {
  getScore,
  getRatings,
  createRating,
};
