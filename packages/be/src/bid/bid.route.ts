import express from 'express';
import BidController from '@/bid/bid.controller';
import { tokenGuard } from '@/auth/auth.guard';
import { bidValidator } from './bid.pipe';
import { placeBidGuard } from './bid.guard';

const bidRoute = express.Router();

bidRoute.post(
  '/',
  bidValidator,
  tokenGuard(false),
  placeBidGuard,
  BidController.bid,
);

export default bidRoute;
