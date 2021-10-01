import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { registerValidator } from '@/auth/auth.pipe';
import { UserRole } from '@/user/user.schema';
import express from 'express';
import AdminController from './admin.controller';
const adminRoute = express.Router();

adminRoute.post(
  '/',
  tokenGuard,
  roleGuard(UserRole.SUPPER_ADMIN),
  registerValidator,
  AdminController.createAdmin,
);

export default adminRoute;
