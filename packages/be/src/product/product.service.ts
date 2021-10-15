import { CategoryModel } from '@/category/category.schema';
import RepositoryService, { ModeQuery } from '@/db/repository.service';
import { parseIntDefault, parseSort } from '@/utils/parser';
import { CreateProductDTO, QueryProductDTO } from './product.dto';
import { ProductDoc, ProductModel } from './product.schema';

class CategoryService
  extends RepositoryService<ProductDoc, CreateProductDTO>
  implements ModeQuery<ProductDoc, QueryProductDTO>
{
  constructor() {
    super(ProductModel);
  }

  async modeFind(
    mode = '',
    {
      category,
      limit,
      skip,
      productName,
      categoryId,
      price,
      end,
      notExpired,
    }: QueryProductDTO = {},
  ): Promise<any> {
    if (mode === 'finishSoon') {
      const products = await this.find({
        expiredAt: {
          $gt: new Date(),
        },
      })
        .sort({
          expiredAt: 1,
        })
        .limit(parseIntDefault(limit, 5));
      return {
        products,
      };
    }
    if (mode === 'bidCount') {
      const products = await this.find({})
        .sort({
          bidCount: -1,
        })
        .limit(parseIntDefault(limit, 5));
      return {
        products,
      };
    }
    if (mode === 'price') {
      const products = await this.find({})
        .sort({
          currentPrice: -1,
        })
        .limit(parseIntDefault(limit, 5));
      return {
        products,
      };
    }
    if (mode === 'category') {
      const products = await this.find({
        category,
      })
        .sort({
          _id: -1,
        })
        .skip(parseIntDefault(skip, 0))
        .limit(parseIntDefault(limit, 10));
      const totalCount = await this.model.countDocuments({
        category,
      });
      return {
        products,
        page: {
          totalCount,
        },
      };
    }
    if (mode == 'search') {
      const sorter: any = {
        _id: -1,
      };
      if (parseSort(price)) {
        sorter.currentPrice = parseSort(price);
      }
      if (parseSort(end)) {
        sorter.expiredAt = parseSort(end);
      }
      const query: any = {};
      if (productName) {
        query.$text = {
          $search: productName,
        };
      }
      if (categoryId) {
        query.category = categoryId;
      }
      if (notExpired === 'true') {
        query.expiredAt = {
          $gt: new Date(),
        };
      }
      const products = await this.find(query)
        .sort(sorter)
        .skip(parseIntDefault(skip, 0))
        .limit(parseIntDefault(limit, 10));
      const totalCount = await this.model.countDocuments(query);
      return {
        products,
        page: {
          totalCount,
        },
      };
    }
    const products = await this.find({})
      .sort({
        _id: -1,
      })
      .skip(parseIntDefault(skip, 0))
      .limit(parseIntDefault(limit, 10));
    const totalCount = await this.model.countDocuments({});
    return {
      products,
      page: {
        totalCount,
      },
    };
  }
}

export default new CategoryService();
