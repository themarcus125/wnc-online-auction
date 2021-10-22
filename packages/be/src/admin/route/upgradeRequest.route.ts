import express from 'express';
import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import AdminController from '@/admin/admin.controller';

export const upgradeRequestRoute = express.Router();

upgradeRequestRoute.patch(
  '/:requestId/approve',
  tokenGuard(false),
  roleGuard(UserRole.ADMIN),
  AdminController.changeRequestStatus(true),
);
upgradeRequestRoute.patch(
  '/:requestId/reject',
  tokenGuard(false),
  roleGuard(UserRole.ADMIN),
  AdminController.changeRequestStatus(false),
);
upgradeRequestRoute.get(
  '/',
  tokenGuard(false),
  roleGuard(UserRole.ADMIN),
  AdminController.getPendingRequest,
);
