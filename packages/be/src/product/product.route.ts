import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import express from 'express';
import ProductController from '@/product/product.controller';
import { uploadHandler } from '@/upload/upload.middleware';
import { mapImagesToBody, transformCreateProductBody } from './product.pipe';
import productController from '@/product/product.controller';

export const productRoute = express.Router();

productRoute.post(
  '/user/',
  tokenGuard,
  roleGuard(UserRole.SELLER),
  uploadHandler(transformCreateProductBody).array('productImages'),
  mapImagesToBody,
  ProductController.createProduct,
);
productRoute.get('/:productId', productController.getProduct);
productRoute.get('/', productController.getProducts);

export default productRoute;
