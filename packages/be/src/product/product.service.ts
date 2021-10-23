import RepositoryService, { ModeQuery } from '@/db/repository.service';
import { parseIntDefault, parseSort } from '@/utils/parser';
import { CreateProductDTO, QueryProductDTO } from './product.dto';
import { ProductDoc, ProductModel, ProductStatus } from './product.schema';

class ProductService
  extends RepositoryService<ProductDoc, CreateProductDTO>
  implements ModeQuery<ProductDoc, QueryProductDTO>
{
  constructor() {
    super(ProductModel);
  }

  async findAndAutoRenew(produdctId: string) {
    const product = await this.findOne({
      _id: produdctId,
      isAutoRenew: true,
    });
    if (!product) return null;
    return this.autoRenew(product);
  }

  async autoRenew(product: ProductDoc) {
    const now = Date.now();
    const oldExpiredAt = new Date(product.expiredAt).getTime();
    const beforeMls = 5 * 60 * 1000;
    const addMls = 10 * 60 * 1000;
    if (now >= oldExpiredAt - beforeMls) {
      product.expiredAt = new Date(oldExpiredAt + addMls);
      await product.save();
    }
    return product;
  }

  async modeFind(
    mode = '',
    {
      category,
      limit,
      skip,
      productId,
      productName,
      categoryId,
      price,
      end,
      notExpired,
      status,
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
      const query: any = { category };
      if (productId) {
        query._id = {
          $ne: productId,
        };
      }
      const products = await this.find(query)
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
      const sorter: any = {};
      if (parseSort(price)) {
        sorter.currentPrice = parseSort(price);
      }
      if (parseSort(end)) {
        sorter.expiredAt = parseSort(end);
      }
      sorter._id = -1;
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
      if (status) {
        query.status = parseIntDefault(status, ProductStatus.NORMAL);
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

export default new ProductService();
