import express from 'express';
import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import AdminController from '@/admin/admin.controller';

export const productRoute = express.Router();
productRoute.delete(
  '/:productId',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  AdminController.deleteProduct,
);
