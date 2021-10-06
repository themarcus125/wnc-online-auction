import RepositoryService from '@/db/repository.service';
import { CreateProductDTO } from './product.dto';
import { ProductDoc, ProductModel } from './product.schema';

class CategoryService extends RepositoryService<ProductDoc, CreateProductDTO> {
  constructor() {
    super(ProductModel);
  }
}

export default new CategoryService();
