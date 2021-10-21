import { RequestHandler } from 'express';
import {
  CreateCategoryDTO,
  QueryCategoryDTO,
  UpdateCategoryDTO,
} from './category.dto';
import ProductService from '@/product/product.service';
import CategoryService from './category.service';
import { BadRequest } from '@/error';

const getCategory: RequestHandler = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await CategoryService.findById(categoryId);
    res.json(category);
  } catch (e) {
    next(e);
  }
};

const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const { parent, mode, populate }: QueryCategoryDTO = req.query;
    const categories = await CategoryService.modeFind(mode, {
      parent,
      populate,
    });
    res.json(categories);
  } catch (e) {
    next(e);
  }
};

const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const { name, parent }: CreateCategoryDTO = req.body;
    const category = await CategoryService.create({
      name,
      parent,
    });
    res.json(category);
  } catch (e) {
    next(e);
  }
};

const updateCategory: RequestHandler = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, parent }: UpdateCategoryDTO = req.body;
    const category = await CategoryService.findOneAndUpdate(
      { _id: categoryId },
      {
        name,
        parent,
      },
    );
    res.json(category);
  } catch (e) {
    next(e);
  }
};

const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const haveProduct = await ProductService.getModel().exists({
      category: categoryId,
    });
    if (haveProduct) {
      return next(new BadRequest('HAVE_PRODUCT'));
    }
    const haveChild = await CategoryService.getModel().exists({
      parent: categoryId,
    });
    if (haveChild) {
      return next(new BadRequest('HAVE_CHILD'));
    }
    const category = await CategoryService.findOneAndUpdate(
      { _id: categoryId },
      {
        isDel: true,
      },
    );
    res.json(category);
  } catch (e) {
    next(e);
  }
};

export default {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
