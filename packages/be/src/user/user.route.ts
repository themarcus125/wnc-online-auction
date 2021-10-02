import express from 'express';

import { emailGuard, tokenGuard } from '@/auth/auth.guard';
import UserController from '@/user/user.controller';
import {
  changeUserPasswordValidator,
  emailBodyValidator,
  resetPasswordValidator,
  updateUserValidator,
  verifyEmailOTPValidator,
} from '@/user/user.pipe';

const userRoute = express.Router();

userRoute.get('/', tokenGuard, UserController.getUser);
userRoute.patch(
  '/',
  tokenGuard,
  updateUserValidator,
  UserController.updateUser,
);

userRoute.post(
  '/password/reset/otp',
  emailBodyValidator,
  UserController.sendResetPasswordOTP,
);
userRoute.patch(
  '/password/reset/otp',
  resetPasswordValidator,
  UserController.resetPassword,
);
userRoute.patch(
  '/password',
  tokenGuard,
  changeUserPasswordValidator,
  UserController.changeUserPassword,
);

userRoute.get(
  '/email/verify/otp',
  tokenGuard,
  emailGuard(false),
  UserController.sendVerifyEmailOTP,
);
userRoute.post(
  '/email',
  tokenGuard,
  emailBodyValidator,
  UserController.checkUserEmail,
);
userRoute.patch(
  '/email/verify/otp',
  tokenGuard,
  emailGuard(false),
  verifyEmailOTPValidator,
  UserController.verifyEmailOTP,
);
userRoute.patch('/email', tokenGuard, UserController.changeUserEmail);

userRoute.post('/upgrade-request', tokenGuard, UserController.createRequest);
userRoute.get('/upgrade-request', tokenGuard, UserController.getUserRequest);

export default userRoute;
