import { RequestHandler } from 'express';
import { JWTPayload } from '@/auth/auth.dto';
import {
  CreateProductRequestDTO,
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
  }: CreateProductRequestDTO = req.body;
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
      expiredAt: new Date(Date.now() + expiredIn * 1000 * 3600),
      currentPrice: startPrice,
    });
    res.json(product);
  } catch (e) {
    removeAll(images);
    next(e);
  }
};

const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const { mode }: QueryProductDTO = req.query;
    const productsData = await ProductService.modeFind(mode, req.query);
    res.json(productsData);
  } catch (e) {
    next(e);
  }
};

const getProduct: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await ProductService.findById(productId)
      .populate('seller', '-password -verifyOtp -passwordOtp')
      .populate('category')
      .populate('currentBidder', '-password -verifyOtp -passwordOtp');
    res.json(product);
  } catch (e) {
    next(e);
  }
};

export default {
  createProduct,
  getProducts,
  getProduct,
};
