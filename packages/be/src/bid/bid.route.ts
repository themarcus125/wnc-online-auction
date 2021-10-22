import express from 'express';
import BidController from '@/bid/bid.controller';
import { tokenGuard } from '@/auth/auth.guard';
import { bidValidator } from './bid.pipe';

const bidRoute = express.Router();

bidRoute.post('/', bidValidator, tokenGuard(false), BidController.bid);

export default bidRoute;
