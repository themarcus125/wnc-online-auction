import express from 'express';

import { emailGuard, tokenGuard } from '@/auth/auth.guard';
import { emailBodyValidator, verifyEmailOTPValidator } from '@/user/user.pipe';
import UserController from '@/user/user.controller';

export const emailRoute = express.Router();

emailRoute.get(
  '/verify/otp',
  tokenGuard(false),
  emailGuard(false),
  UserController.sendVerifyEmailOTP,
);
emailRoute.patch(
  '/verify/otp',
  verifyEmailOTPValidator,
  tokenGuard(false),
  emailGuard(false),
  UserController.verifyEmailOTP,
);
emailRoute.post(
  '/',
  emailBodyValidator,
  tokenGuard(false),
  UserController.checkUserEmail,
);
emailRoute.patch('/', tokenGuard(false), UserController.changeUserEmail);
