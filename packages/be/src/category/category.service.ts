import RepositoryService, { ModeQuery } from '@/db/repository.service';
import { CreateCategoryDTO, QueryCategoryDTO } from './category.dto';
import { CategoryDoc, CategoryModel } from './category.schema';

class CategoryService extends RepositoryService<
  CategoryDoc,
  CreateCategoryDTO
> {
  constructor() {
    super(CategoryModel);
  }
}
export const modeQuery: ModeQuery<CategoryDoc, QueryCategoryDTO> = (
  mode = '',
  { parent } = {},
) => {
  if (mode === 'parent') {
    return {
      isDel: false,
      parent: { $exists: false },
    };
  }
  if (mode === 'child') {
    return {
      isDel: false,
      parent: parent || { $exists: true },
    };
  }
  return {
    isDel: false,
  };
};
export default new CategoryService();
