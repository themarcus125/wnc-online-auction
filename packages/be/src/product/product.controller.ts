import { RequestHandler } from 'express';
import { JWTPayload } from '@/auth/auth.dto';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import ProductService from './product.service';

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const {
      name,
      descriptions,
      category,
      images,
      buyPrice,
      startPrice,
      stepPrice,
      expiredIn,
    }: CreateProductDTO = req.body;
    const product = await ProductService.create({
      name,
      seller: id,
      descriptions,
      category,
      images,
      buyPrice,
      startPrice,
      stepPrice,
      expiredIn,
    });
    res.json(product);
  } catch (e) {
    next(e);
  }
};

export default {
  createProduct,
};
