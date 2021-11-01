import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { ProductDoc } from '@/product/product.schema';
import { UserDoc } from '@/user/user.schema';
import {
  ProductModelName,
  WatchListModelName,
  UserModelName,
} from '@/db/modelName';

export interface WatchList {
  user: PopulatedDoc<UserDoc>;
  product: PopulatedDoc<ProductDoc>;
}

export type WLDoc = WatchList & Document;

export const WLSchema = new Schema<WLDoc>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: UserModelName,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: ProductModelName,
      required: true,
    },
  },
  { timestamps: true },
);
WLSchema.index({ user: 1, product: 1 }, { unique: true });
export const WLModel = model<WLDoc>(WatchListModelName, WLSchema);
