import express from 'express';
import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { registerValidator } from '@/auth/auth.pipe';
import { UserRole } from '@/user/user.schema';
import AdminController from '@/admin/admin.controller';
const adminRoute = express.Router();

adminRoute.post(
  '/',
  tokenGuard,
  roleGuard(UserRole.SUPPER_ADMIN),
  registerValidator,
  AdminController.createAdmin,
);

adminRoute.patch(
  '/upgrade-request/:requestId/approve',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.changeRequestStatus(true),
);
adminRoute.patch(
  '/upgrade-request/:requestId/reject',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.changeRequestStatus(false),
);
adminRoute.get(
  '/upgrade-request/',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.getPendingRequest,
);

export default adminRoute;
