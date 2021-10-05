import { roleGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import express from 'express';
import ProductController from '@/product/product.controller';

export const productRoute = express.Router();

productRoute.post(
  '/user/',
  roleGuard(UserRole.SELLER),
  ProductController.createProduct,
);

export default productRoute;
