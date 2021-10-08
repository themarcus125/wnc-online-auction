import RepositoryService, { ModeQuery } from '@/db/repository.service';
import { parseIntDefault } from '@/utils/parser';
import { CreateProductDTO, QueryProductDTO } from './product.dto';
import {
  productJoinCategoryPipeline,
  ProductDoc,
  ProductModel,
} from './product.schema';

class CategoryService
  extends RepositoryService<ProductDoc, CreateProductDTO>
  implements ModeQuery<ProductDoc, QueryProductDTO>
{
  constructor() {
    super(ProductModel);
  }

  async modeFind(mode = '', { category, limit, skip }: QueryProductDTO = {}) {
    if (mode === 'finishSoon') {
      return await this.find({
        expiredAt: {
          $gt: new Date(),
        },
      })
        .sort({
          expiredAt: 1,
        })
        .limit(parseIntDefault(limit, 5));
    }
    if (mode === 'bidCount') {
      return await this.find({})
        .sort({
          bidCount: -1,
        })
        .limit(parseIntDefault(limit, 5));
    }
    if (mode === 'price') {
      return await this.find({})
        .sort({
          currentPrice: -1,
        })
        .limit(parseIntDefault(limit, 5));
    }
    if (mode == 'search') {
      // const products: ProductDoc[] = await this.getModel()
      //   .aggregate(productJoinCategoryPipeline)
      //   .skip(parseIntDefault(skip, 0))
      //   .limit(parseIntDefault(limit, 10));
      // return products;
    }
    return await this.find({})
      .sort({
        _id: -1,
      })
      .skip(parseIntDefault(skip, 0))
      .limit(parseIntDefault(limit, 10));
  }
}

export default new CategoryService();
