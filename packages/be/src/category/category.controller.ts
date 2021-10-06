import { RequestHandler } from 'express';
import {
  CreateCategoryDTO,
  QueryCategoryDTO,
  UpdateCategoryDTO,
} from './category.dto';
import CategoryService, { modeQuery } from './category.service';

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
    const categories = await CategoryService.find(
      modeQuery(mode || '', { parent }),
    ).populate(populate === 'true' ? 'parent' : undefined);
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
