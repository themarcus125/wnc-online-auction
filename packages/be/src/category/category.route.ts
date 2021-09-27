import { roleGuard, userGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import express from 'express';
import CategoryController from './category.controller';

const categoryRoute = express.Router();

categoryRoute.get('/', CategoryController.getCategories);
categoryRoute.post(
  '/',
  userGuard,
  roleGuard(UserRole.ADMIN),
  CategoryController.createCategory,
);

export default categoryRoute;
