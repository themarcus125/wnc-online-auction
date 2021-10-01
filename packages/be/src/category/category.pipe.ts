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
    return res.status(400).json({
      error: 'INVALID_NAME',
    });
  }
  if (parent) {
    try {
      const pCateggory = await CategoryService.findById(parent);
      if (!pCateggory) {
        return res.status(404).json({
          error: 'NOT_FOUND_PARENT',
        });
      }
    } catch (e) {
      return res.status(500).json({
        error: 'SOMETHING_WENT_WRONG',
      });
    }
  }
  next();
};
