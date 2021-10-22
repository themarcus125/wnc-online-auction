import { BadRequest } from '@/error';
import { length } from '@/utils/validator';
import { RequestHandler } from 'express';
import { CreateCategoryDTO } from './category.dto';
import CategoryService from './category.service';

export const createCategoryValidator: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { name, parent }: CreateCategoryDTO = req.body;
  if (!length(name, 1, 30)) {
    return next(new BadRequest('INVALID_NAME'));
  }
  if (parent) {
    try {
      const pCateggory = await CategoryService.findById(parent);
      if (!pCateggory) {
        return next(new BadRequest('NOT_FOUND_PARENT'));
      }
    } catch (e) {
      return next(new Error('SOMETHING_WENT_WRONG'));
    }
  }
  next();
};
