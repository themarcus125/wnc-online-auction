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

  searchName({ productName, categoryName, notExpired }: QueryProductDTO) {
    let query = this.model.aggregate();
    if (productName)
      query = query.match({
        $text: {
          $search: productName,
        },
      });
    if (notExpired === 'true')
      query = query.match({
        expiredAt: {
          $gt: new Date(),
        },
      });
    query = query
      .lookup({
        from: CategoryModel.collection.name,
        let: { category: '$category' },
        pipeline: [
          {
            $match: categoryName
              ? {
                  $expr: { $eq: ['$$category', '$_id'] },
                  $text: {
                    $search: categoryName,
                  },
                }
              : {
                  $expr: { $eq: ['$$category', '$_id'] },
                },
          },
        ],
        as: 'category',
      })
      .unwind({
        path: '$category',
      });
    return query;
  }

  async modeFind(
    mode = '',
    {
      category,
      limit,
      skip,
      productName,
      categoryName,
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
      return (
        await this.searchName({
          productName,
          categoryName,
          notExpired,
        })
          .sort(sorter)
          .facet({
            products: [
              { $skip: parseIntDefault(skip, 0) },
              { $limit: parseIntDefault(limit, 10) },
            ],
            page: [{ $count: 'totalCount' }],
          })
          .unwind({
            path: '$page',
          })
      )[0];
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
