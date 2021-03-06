import { tokenGuard } from '@/auth/auth.guard';
import express from 'express';
import RatingController from './rating.controller';
import { sellerRateGuard, winnerRateGuard } from './rating.guard';

const ratingRoute = express.Router();

ratingRoute.post(
  '/product/:productId/seller',
  tokenGuard(false),
  sellerRateGuard,
  RatingController.createRating(true),
);
ratingRoute.post(
  '/product/:productId/winner',
  tokenGuard(false),
  winnerRateGuard,
  RatingController.createRating(false),
);
ratingRoute.get('/score/:userId', RatingController.getScore);
ratingRoute.get('/', tokenGuard(false), RatingController.getRatings);

export default ratingRoute;
