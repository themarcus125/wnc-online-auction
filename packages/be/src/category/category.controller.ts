import { RequestHandler } from 'express';
import { CreateCategoryDTO } from './category.dto';
import CategoryService from './category.service';

const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const { parent } = req.query;
    const categories = await CategoryService.find({
      isDel: false,
      parent: parent ? parent : undefined,
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

export default {
  getCategories,
  createCategory,
};