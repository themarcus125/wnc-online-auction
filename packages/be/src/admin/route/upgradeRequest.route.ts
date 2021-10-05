import express from 'express';
import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import AdminController from '@/admin/admin.controller';

export const upgradeRequestRoute = express.Router();

upgradeRequestRoute.patch(
  '/:requestId/approve',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.changeRequestStatus(true),
);
upgradeRequestRoute.patch(
  '/:requestId/reject',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.changeRequestStatus(false),
);
upgradeRequestRoute.get(
  '/',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.getPendingRequest,
);
