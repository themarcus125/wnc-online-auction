import express from 'express';
import BidController from '@/bid/bid.controller';
import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { bidValidator } from './bid.pipe';
import { placeBidGuard, rejectBidGuard } from './bid.guard';
import { UserRole } from '@/user/user.schema';

const bidRoute = express.Router();

bidRoute.get(
  '/product/:productId/seller',
  tokenGuard(false),
  BidController.getSellerBidHistory,
);
bidRoute.get(
  '/product/:productId/bidder',
  tokenGuard(false),
  BidController.getBidderBidHistory,
);
bidRoute.patch(
  '/product/:productId/buynow',
  tokenGuard(false),
  BidController.buyNow,
);
bidRoute.get('/product/:productId', BidController.getBidHistory);
bidRoute.patch(
  '/:bidId/reject',
  tokenGuard(false),
  roleGuard(UserRole.SELLER),
  rejectBidGuard,
  BidController.rejectBid,
);
bidRoute.get('/:bidId', tokenGuard(false), BidController.getBid);
bidRoute.post(
  '/',
  bidValidator,
  tokenGuard(false),
  placeBidGuard,
  BidController.placeBid,
);

export default bidRoute;
