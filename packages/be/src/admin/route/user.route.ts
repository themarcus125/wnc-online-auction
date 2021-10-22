import express from 'express';
import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import AdminController from '@/admin/admin.controller';

export const userRoute = express.Router();
userRoute.delete(
  '/:userId',
  tokenGuard(false),
  roleGuard(UserRole.ADMIN),
  AdminController.deleteUser,
);
userRoute.patch(
  '/:userId',
  tokenGuard(false),
  roleGuard(UserRole.ADMIN),
  AdminController.updateUser,
);
userRoute.get(
  '/:userId',
  tokenGuard(false),
  roleGuard(UserRole.ADMIN),
  AdminController.getUser,
);
userRoute.get(
  '/',
  tokenGuard(false),
  roleGuard(UserRole.ADMIN),
  AdminController.getUsers,
);
userRoute.post(
  '/',
  tokenGuard(false),
  roleGuard(UserRole.ADMIN),
  AdminController.createUser,
);
