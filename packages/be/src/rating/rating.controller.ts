import ProductService from '@/product/product.service';
import { RequestHandler } from 'express';
import { CreateRatingDTO } from './rating.dto';
import RatingService from './rating.service';

export const getRatings: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const ratings = await RatingService.find({
      targetUser: id,
    }).populate('createUser', 'name');
    res.json(ratings);
  } catch (e) {
    next(e);
  }
};

export const createRating: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const { productId } = req.params;
    const { targetUser, feedback, score }: CreateRatingDTO = req.body;
    const rating = await RatingService.create({
      createUser: id,
      targetUser,
      feedback,
      score,
    });
    const updatedProduct = await ProductService.getModel().findByIdAndUpdate(
      productId,
      { winnerRating: rating._id },
      { returnOriginal: false },
    );
    res.json({
      rating,
      updatedProduct,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  getRatings,
  createRating,
};
