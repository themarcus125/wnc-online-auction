import express from 'express';

import { tokenGuard } from '@/auth/auth.guard';
import UserController from '@/user/user.controller';

export const upgradeRequestRoute = express.Router();

upgradeRequestRoute.post('/', tokenGuard(false), UserController.createRequest);
upgradeRequestRoute.get('/', tokenGuard(false), UserController.getUserRequest);
