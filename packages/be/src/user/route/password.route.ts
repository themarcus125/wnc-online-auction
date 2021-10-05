import express from 'express';
import { tokenGuard } from '@/auth/auth.guard';
import {
  changeUserPasswordValidator,
  emailBodyValidator,
  resetPasswordValidator,
} from '@/user/user.pipe';
import UserController from '@/user/user.controller';

export const passwordRoute = express.Router();

passwordRoute.post(
  '/reset/otp',
  emailBodyValidator,
  UserController.sendResetPasswordOTP,
);
passwordRoute.patch(
  '/reset/otp',
  resetPasswordValidator,
  UserController.resetPassword,
);
passwordRoute.patch(
  '/',
  tokenGuard,
  changeUserPasswordValidator,
  UserController.changeUserPassword,
);
