import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import express from 'express';
import AdminController from './admin.controller';
const adminRoute = express.Router();

adminRoute.post(
  '/',
  tokenGuard,
  roleGuard(UserRole.SUPPER_ADMIN),
  AdminController.createAdmin,
);

export default adminRoute;
