import BaseService from '@/utils/base.service';
import { CreateCategoryDTO } from './category.dto';
import { CategoryDoc, CategoryModel } from './category.schema';

class CategoryService extends BaseService<CategoryDoc, CreateCategoryDTO> {
  constructor() {
    super(CategoryModel);
  }
}

export default new CategoryService();
