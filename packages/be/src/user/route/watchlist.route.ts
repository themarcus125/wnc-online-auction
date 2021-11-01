import express from 'express';

import { tokenGuard } from '@/auth/auth.guard';
import WLController from '@/watchlist/watchlist.controller';

export const wlRoute = express.Router();

wlRoute.get('/product', tokenGuard(false), WLController.getWatchListProduct);
wlRoute.delete('/:wlId', tokenGuard(false), WLController.removeWatchList);
wlRoute.post('/', tokenGuard(false), WLController.addToWatchList);
