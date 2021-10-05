import { roleGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import express from 'express';
import ProductController from '@/product/product.controller';

export const productRoute = express.Router();

productRoute.post(
  '/',
  roleGuard(UserRole.SELLER),
  ProductController.createProduct,
);
