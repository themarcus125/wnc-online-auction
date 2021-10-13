import RepositoryService, { ModeQuery } from '@/db/repository.service';
import { CreateCategoryDTO, QueryCategoryDTO } from './category.dto';
import { CategoryDoc, CategoryModel } from './category.schema';

class CategoryService
  extends RepositoryService<CategoryDoc, CreateCategoryDTO>
  implements ModeQuery<CategoryDoc, QueryCategoryDTO>
{
  constructor() {
    super(CategoryModel);
  }

  modeFilterQuery(mode = '', { parent }: QueryCategoryDTO = {}) {
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
  }

  async modeFind(mode = '', { parent, populate }: QueryCategoryDTO = {}) {
    const categories = await this.find(
      this.modeFilterQuery(mode, { parent }),
    ).populate(populate === 'true' ? 'parent' : undefined);
    return categories;
  }
}

export default new CategoryService();
