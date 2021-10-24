import { tokenGuard } from '@/auth/auth.guard';
import express from 'express';
import RatingController from './rating.controller';
import { sellerRateGuard, winnerRateGuard } from './rating.guard';

const ratingRoute = express.Router();

ratingRoute.post(
  '/seller',
  tokenGuard(false),
  sellerRateGuard,
  RatingController.createRating,
);
ratingRoute.post(
  '/winner',
  tokenGuard(false),
  winnerRateGuard,
  RatingController.createRating,
);
ratingRoute.get('/', tokenGuard(false), RatingController.getRatings);

export default ratingRoute;