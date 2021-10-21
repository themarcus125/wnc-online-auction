import { RequestHandler } from 'express';
import { CreateRatingDTO } from './rating.dto';
import RatingService from './rating.service';

export const getRatings: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const ratings = await RatingService.find({
      targetUser: id,
    }).populate('createUser', '_id name');
    res.json(ratings);
  } catch (e) {
    next(e);
  }
};

export const createRating: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const { targetUser, feedback, score }: CreateRatingDTO = req.body;
    const rating = await RatingService.create({
      createUser: id,
      targetUser,
      feedback,
      score,
    });
    res.json({
      rating,
    });
  } catch (e) {
    next(e);
  }
};
