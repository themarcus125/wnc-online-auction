import { RequestHandler } from 'express';
import { JWTPayload } from '@/auth/auth.dto';
import {
  TransformedCreateProductRequestDTO,
  QueryProductDTO,
} from './product.dto';
import { removeAll } from '@/utils/file';
import ProductService from './product.service';
import { excludeString } from '@/user/user.schema';
import { NotFound } from '@/error';

const createProduct: RequestHandler = async (req, res, next) => {
  const {
    name,
    category,
    buyPrice,
    startPrice,
    stepPrice,
    expiredIn,
    isAutoRenew,
    onlyRatedBidder,
    images,
    descriptions,
  }: TransformedCreateProductRequestDTO = req.body;
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const now = Date.now();
    const product = await ProductService.create({
      name,
      seller: id,
      descriptions,
      category,
      images,
      startPrice,
      stepPrice,
      buyPrice,
      createdAt: new Date(now),
      expiredAt: new Date(now + expiredIn * 1000 * 3600),
      currentPrice: startPrice,
      isAutoRenew,
      onlyRatedBidder,
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
      .populate('seller', excludeString)
      .populate('category');
    res.json(product);
  } catch (e) {
    next(e);
  }
};

const appendProductDescription: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const { description, productId } = req.body;
    const product = await ProductService.findOneAndUpdate(
      {
        _id: productId,
        seller: id,
      },
      {
        $push: {
          descriptions: description,
        },
      },
    );
    if (!product) {
      return next(new NotFound('NOT_FOUND_PRODUCT'));
    }
    res.json({
      descriptions: product.descriptions,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  createProduct,
  getProducts,
  getProduct,
  appendProductDescription,
};
