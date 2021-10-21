import express from 'express';
import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import CategoryController from '@/category/category.controller';
import { createCategoryValidator } from '@/category/category.pipe';

export const categoryRoute = express.Router();

categoryRoute.patch(
  '/:categoryId',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  CategoryController.updateCategory,
);
categoryRoute.delete(
  '/:categoryId',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  CategoryController.deleteCategory,
);
categoryRoute.post(
  '/',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  createCategoryValidator,
  CategoryController.createCategory,
);

export default categoryRoute;
