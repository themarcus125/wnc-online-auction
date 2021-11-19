import RepositoryService, { ModeQuery } from '@/db/repository.service';
import { excludeString } from '@/user/user.schema';
import { parseIntDefault, parseSort } from '@/utils/parser';
import { FilterQuery, QueryOptions } from 'mongoose';
import { appConfig, dbConfig } from '~/config';
import { CreateProductDTO, QueryProductDTO } from './product.dto';
import { ProductDoc, ProductModel, ProductStatus } from './product.schema';

class ProductService
  extends RepositoryService<ProductDoc, CreateProductDTO>
  implements ModeQuery<ProductDoc, QueryProductDTO>
{
  constructor() {
    super(ProductModel);
  }

  productClientLink(id: string) {
    return `${appConfig.clientURL}/product/${id}`;
  }

  async findPopulate(query: FilterQuery<ProductDoc>, options?: QueryOptions) {
    return this.find(query, options)
      .populate('seller', excludeString)
      .populate('currentBidder', excludeString)
      .populate('category');
  }

  async findNotExpired() {
    return this.find({
      expiredAt: {
        $gt: new Date(),
      },
      status: ProductStatus.NORMAL,
    }).populate('seller', excludeString);
  }

  getAutoRenewDate(product: ProductDoc) {
    if (!product.isAutoRenew) return product.expiredAt;
    const now = Date.now();
    const oldExpiredAt = new Date(product.expiredAt).getTime();
    const beforeMls = 5 * 60 * 1000;
    const addMls = 10 * 60 * 1000;
    if (now >= oldExpiredAt - beforeMls) {
      return new Date(oldExpiredAt + addMls);
    }
    return product.expiredAt;
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
        status: ProductStatus.NORMAL,
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
      const products = await this.find({
        expiredAt: {
          $gt: new Date(),
        },
        status: ProductStatus.NORMAL,
      })
        .sort({
          bidCount: -1,
        })
        .limit(parseIntDefault(limit, 5));
      return {
        products,
      };
    }
    if (mode === 'price') {
      const products = await this.find({
        expiredAt: {
          $gt: new Date(),
        },
        status: ProductStatus.NORMAL,
      })
        .sort({
          currentPrice: -1,
        })
        .limit(parseIntDefault(limit, 5));
      return {
        products,
      };
    }
    if (mode === 'category') {
      const query: any = {
        category,
        expiredAt: {
          $gt: new Date(),
        },
        status: ProductStatus.NORMAL,
      };
      if (productId) {
        query._id = {
          $ne: productId,
        };
      }
      const products = await this.find(query)
        .populate('currentBidder', excludeString)
        .sort({
          _id: -1,
        })
        .skip(parseIntDefault(skip, 0))
        .limit(parseIntDefault(limit, 10));
      const totalCount = await this.getModel().countDocuments({
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
      if (notExpired === 'false') {
        query.expiredAt = {
          $lt: new Date(),
        };
      }
      if (status) {
        query.status = parseIntDefault(status, ProductStatus.NORMAL);
      }
      const products = await this.find(query)
        .populate('currentBidder', excludeString)
        .sort(sorter)
        .skip(parseIntDefault(skip, 0))
        .limit(parseIntDefault(limit, 10));
      const totalCount = await this.getModel().countDocuments(query);
      return {
        products,
        page: {
          totalCount,
        },
      };
    }
    const products = await this.find({
      expiredAt: {
        $gt: new Date(),
      },
      status: ProductStatus.NORMAL,
    })
      .populate('currentBidder', excludeString)
      .sort({
        _id: -1,
      })
      .skip(parseIntDefault(skip, 0))
      .limit(parseIntDefault(limit, 10));
    const totalCount = await this.getModel().countDocuments({});
    return {
      products,
      page: {
        totalCount,
      },
    };
  }
}

export default new ProductService();
