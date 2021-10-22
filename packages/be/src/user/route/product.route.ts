import express from 'express';

import { tokenGuard } from '@/auth/auth.guard';
import ProductController from '@/product/product.controller';

export const productRoute = express.Router();

productRoute.patch(
  '/description',
  tokenGuard,
  ProductController.appendProductDescription,
);
