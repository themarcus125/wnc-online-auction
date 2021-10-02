import express from 'express';
import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { registerValidator } from '@/auth/auth.pipe';
import { UserRole } from '@/user/user.schema';
import AdminController from '@/admin/admin.controller';
const adminRoute = express.Router();

adminRoute.delete(
  '/user/:userId',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.deleteUser,
);
adminRoute.patch(
  '/user/:userId',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.updateUser,
);
adminRoute.get(
  '/user/:userId',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.getUser,
);
adminRoute.get(
  '/user',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.getUsers,
);
adminRoute.post(
  '/user',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.createUser,
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
adminRoute.post(
  '/',
  tokenGuard,
  roleGuard(UserRole.SUPPER_ADMIN),
  registerValidator,
  AdminController.createAdmin,
);

export default adminRoute;
