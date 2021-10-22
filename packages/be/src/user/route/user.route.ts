import express from 'express';

import { tokenGuard } from '@/auth/auth.guard';
import { updateUserValidator } from '@/user/user.pipe';
import UserController from '@/user/user.controller';

import { passwordRoute } from './password.route';
import { emailRoute } from './email.route';
import { upgradeRequestRoute } from './upgradeRequest.route';
import { productRoute } from './product.route';

export const userRoute = express.Router();

userRoute.use('/product', productRoute);
userRoute.use('/password', passwordRoute);
userRoute.use('/email', emailRoute);
userRoute.use('/upgrade-request', upgradeRequestRoute);

userRoute.get('/', tokenGuard, UserController.getUser);
userRoute.patch(
  '/',
  tokenGuard,
  updateUserValidator,
  UserController.updateUser,
);

export default userRoute;
