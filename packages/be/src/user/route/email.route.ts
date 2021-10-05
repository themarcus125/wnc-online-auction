import express from 'express';

import { emailGuard, tokenGuard } from '@/auth/auth.guard';
import { emailBodyValidator, verifyEmailOTPValidator } from '@/user/user.pipe';
import UserController from '@/user/user.controller';

export const emailRoute = express.Router();

emailRoute.get(
  '/verify/otp',
  tokenGuard,
  emailGuard(false),
  UserController.sendVerifyEmailOTP,
);
emailRoute.patch(
  '/verify/otp',
  tokenGuard,
  emailGuard(false),
  verifyEmailOTPValidator,
  UserController.verifyEmailOTP,
);
emailRoute.post(
  '/',
  tokenGuard,
  emailBodyValidator,
  UserController.checkUserEmail,
);
emailRoute.patch('/', tokenGuard, UserController.changeUserEmail);
