import express from 'express';

import { emailGuard, tokenGuard } from '@/auth/auth.guard';
import UserController from './user.controller';

const userRoute = express.Router();

userRoute.get('/', tokenGuard, UserController.getUser);
userRoute.patch('/', tokenGuard, UserController.updateUser);
userRoute.get(
  '/password/reset/otp',
  tokenGuard,
  UserController.sendResetPasswordOTP,
);
userRoute.patch('/password/reset/otp', UserController.resetPassword);
userRoute.patch('/password', tokenGuard, UserController.changeUserPassword);
userRoute.get(
  '/email/verify/otp',
  tokenGuard,
  emailGuard(false),
  UserController.sendVerifyEmailOTP,
);
userRoute.post('/email', tokenGuard, UserController.checkUserEmail);
userRoute.patch(
  '/email/verify/otp',
  tokenGuard,
  emailGuard(false),
  UserController.verifyEmailOTP,
);
userRoute.patch('/email', tokenGuard, UserController.changeUserEmail);

export default userRoute;
