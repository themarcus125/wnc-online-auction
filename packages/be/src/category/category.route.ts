import express from 'express';
import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import CategoryController from '@/category/category.controller';
import { createCategoryValidator } from '@/category/category.pipe';

const categoryRoute = express.Router();

categoryRoute.get('/:categoryId', CategoryController.getCategory);
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
categoryRoute.get('/', CategoryController.getCategories);
categoryRoute.post(
  '/',
  tokenGuard,
  roleGuard(UserRole.ADMIN),
  createCategoryValidator,
  CategoryController.createCategory,
);

export default categoryRoute;
