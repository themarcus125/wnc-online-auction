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
import ScheduleService from '@/schedule/schedule.service';
import { ProductStatus } from './product.schema';
import RatingService from '@/rating/rating.service';
import mongoose from 'mongoose';

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
    if (product) {
      ScheduleService.addMailJob(product._id, product.expiredAt);
    }
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

const getProductPlacing: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const products = await ProductService.find({
      expiredAt: {
        $gt: new Date(),
      },
      bidder: id,
    });
    res.json(products);
  } catch (e) {
    next(e);
  }
};

const getProductWon: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const products = await ProductService.find({
      expiredAt: {
        $lt: new Date(),
      },
      currentBidder: id,
    });
    res.json(products);
  } catch (e) {
    next(e);
  }
};

const getProductSelling: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const products = await ProductService.find({
      seller: id,
      expiredAt: {
        $gt: new Date(),
      },
      status: ProductStatus.NORMAL,
    });
    res.json(products);
  } catch (e) {
    next(e);
  }
};

const getProductSold: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const products = await ProductService.find({
      seller: id,
      $or: [
        {
          expiredAt: {
            $lt: new Date(),
          },
        },
        {
          status: ProductStatus.SOLD,
        },
      ],
    });
    res.json(products);
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

const cancelProduct: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const { productId } = req.params;
    const product = await ProductService.findOne({
      _id: productId,
      seller: id,
      currentBidder: {
        $exists: true,
      },
      $or: [
        {
          expiredAt: {
            $lt: new Date(),
          },
        },
        {
          status: ProductStatus.SOLD,
        },
      ],
    }).session(session);
    if (!product) return next(new NotFound('PRODUCT'));
    if (!product.currentBidder) {
      return next(new NotFound('BIDDER'));
    }
    const canceledProduct = await ProductService.model
      .findByIdAndUpdate(productId, {
        status: ProductStatus.CANCELED,
      })
      .session(session);
    await RatingService.model.create(
      [
        {
          targetUser: product.currentBidder,
          createUser: id,
          feedback: 'Người thắng không thanh toán',
          score: false,
        },
      ],
      { session },
    );
    await session.commitTransaction();
    await session.endSession();
    res.json(canceledProduct);
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
    next(e);
  }
};

export default {
  createProduct,
  getProductPlacing,
  getProductWon,
  getProductSelling,
  getProductSold,
  getProducts,
  getProduct,
  cancelProduct,
  appendProductDescription,
};
