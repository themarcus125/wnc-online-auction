import express from 'express';

import { tokenGuard } from '@/auth/auth.guard';
import WLController from '@/watchlist/watchlist.controller';

export const wlRoute = express.Router();

wlRoute.post('/', tokenGuard(false), WLController.addToWatchList);
wlRoute.get('/product', tokenGuard(false), WLController.getWatchListProduct);
