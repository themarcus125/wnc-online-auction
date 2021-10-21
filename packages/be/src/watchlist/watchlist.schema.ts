import { PopulatedDoc } from 'mongoose';
import { ProductDoc } from '@/product/product.schema';
import { UserDoc } from '@/user/user.schema';

export const WatchListModelName = 'WatchList';

export interface WatchList {
  user: PopulatedDoc<UserDoc>;
  product: PopulatedDoc<ProductDoc>;
}
