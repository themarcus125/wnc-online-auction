import { RequestHandler } from 'express';
import { JWTPayload } from '@/auth/auth.dto';
import {
  CreateProductDTO,
  QueryProductDTO,
  UpdateProductDTO,
} from './product.dto';
import ProductService from './product.service';
import { removeAll } from '@/utils/file';

const createProduct: RequestHandler = async (req, res, next) => {
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
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const product = await ProductService.create({
      name,
      seller: id,
      descriptions,
      category,
      images,
      startPrice,
      stepPrice,
      buyPrice,
      currentPrice: startPrice,
      expiredIn,
    });
    res.json(product);
  } catch (e) {
    removeAll(images);
    next(e);
  }
};

const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const { mode, category, limit, skip }: QueryProductDTO = req.query;
    const products = await ProductService.modeFind(mode, {
      category,
      limit,
      skip,
    });
    res.json(products);
  } catch (e) {
    next(e);
  }
};

export default {
  createProduct,
  getProducts,
};
