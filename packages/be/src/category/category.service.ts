import RepositoryService from '@/db/repository.service';
import { CreateCategoryDTO } from './category.dto';
import { CategoryDoc, CategoryModel } from './category.schema';

class CategoryService extends RepositoryService<
  CategoryDoc,
  CreateCategoryDTO
> {
  constructor() {
    super(CategoryModel);
  }
}

export default new CategoryService();
