import express from 'express';
import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import AdminController from '@/admin/admin.controller';

export const userRoute = express.Router();
userRoute.delete(
  '/:userId',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.deleteUser,
);
userRoute.patch(
  '/:userId',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.updateUser,
);
userRoute.get(
  '/:userId',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.getUser,
);
userRoute.get(
  '/',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.getUsers,
);
userRoute.post(
  '/',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.createUser,
);
