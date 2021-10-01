import express from 'express';
import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { registerValidator } from '@/auth/auth.pipe';
import { UserRole } from '@/user/user.schema';
import AdminController from '@/admin/admin.controller';
import UpgradeRequestController from '@/upgradeRequest/upgradeRequest.controller';
const adminRoute = express.Router();

adminRoute.post(
  '/',
  tokenGuard,
  roleGuard(UserRole.SUPPER_ADMIN),
  registerValidator,
  AdminController.createAdmin,
);

adminRoute.patch(
  '/upgrade-request/approve',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  UpgradeRequestController.changeRequestStatus(true),
);
adminRoute.patch(
  '/upgrade-request/reject',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  UpgradeRequestController.changeRequestStatus(false),
);

export default adminRoute;
