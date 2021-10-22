import express from 'express';
import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { registerValidator } from '@/auth/auth.pipe';
import { UserRole } from '@/user/user.schema';
import AdminController from '@/admin/admin.controller';

import { userRoute } from './user.route';
import { upgradeRequestRoute } from './upgradeRequest.route';
import { productRoute } from './product.route';
import { categoryRoute } from './category.route';

const adminRoute = express.Router();

adminRoute.use('/category', categoryRoute);
adminRoute.use('/product', productRoute);
adminRoute.use('/user', userRoute);
adminRoute.use('/upgrade-request', upgradeRequestRoute);
adminRoute.post(
  '/',
  registerValidator,
  tokenGuard(false),
  roleGuard(UserRole.SUPPER_ADMIN),
  AdminController.createAdmin,
);

export default adminRoute;
