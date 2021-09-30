import BaseService from '@/utils/base.service';
import { CreateProductDTO } from './product.dto';
import { ProductDoc, ProductModel } from './product.schema';

class CategoryService extends BaseService<ProductDoc, CreateProductDTO> {
  constructor() {
    super(ProductModel);
  }
}

export default new CategoryService();
