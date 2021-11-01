import { roleGuard, tokenGuard } from '@/auth/auth.guard';
import { UserRole } from '@/user/user.schema';
import express from 'express';
import ProductController from '@/product/product.controller';
import { uploadHandler } from '@/upload/upload.middleware';
import { mapImagesToBody, transformCreateProductBody } from './product.pipe';

const productRoute = express.Router();

productRoute.get(
  '/bidder/placing',
  tokenGuard(false),
  ProductController.getProductPlacing,
);
productRoute.get(
  '/bidder/won',
  tokenGuard(false),
  ProductController.getProductWon,
);
productRoute.get(
  '/seller/selling',
  tokenGuard(false),
  roleGuard(UserRole.SELLER),
  ProductController.getProductSelling,
);
productRoute.get(
  '/seller/sold',
  tokenGuard(false),
  roleGuard(UserRole.SELLER),
  ProductController.getProductSold,
);

productRoute.post(
  '/user',
  tokenGuard(false),
  roleGuard(UserRole.SELLER),
  uploadHandler(transformCreateProductBody).array('productImages'),
  mapImagesToBody,
  ProductController.createProduct,
);
productRoute.patch(
  '/:productId/cancel',
  tokenGuard(false),
  roleGuard(UserRole.SELLER),
  ProductController.cancelProduct,
);
productRoute.get('/:productId', ProductController.getProduct);
productRoute.get('/', ProductController.getProducts);

export default productRoute;
