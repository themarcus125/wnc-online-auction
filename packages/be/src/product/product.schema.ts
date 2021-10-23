import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { UserDoc, UserModelName } from '@/user/user.schema';
import { CategoryDoc, CategoryModelName } from '@/category/category.schema';

export const ProductModelName = 'Product';

export enum ProductStatus {
  NORMAL,
  WAITING,
  CONFIRM,
  CANCELED,
}

export interface Product {
  name: string;
  descriptions: string[];
  category: PopulatedDoc<CategoryDoc>;
  images: string[];
  seller: PopulatedDoc<UserDoc>;
  startPrice: number;
  stepPrice: number;
  buyPrice?: number;
  currentPrice: number;
  bidCount: number;
  expiredAt: Date;
  createdAt: Date;
  isAutoRenew?: boolean;
  onlyRatedBidder?: boolean;
  status: number;
}

export type ProductDoc = Product & Document;

export const ProductSchema = new Schema<ProductDoc>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30,
      index: 'text',
    },
    descriptions: { type: [String], required: true },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: CategoryModelName,
    },
    images: {
      type: [String],
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UserModelName,
    },
    startPrice: { type: Number, require: true },
    stepPrice: { type: Number, require: true },
    buyPrice: Number,
    currentPrice: { type: Number, require: true, index: 1 },
    bidCount: { type: Number, default: 0, index: 1 },
    expiredAt: { type: Date, require: true, index: 1 },
    isAutoRenew: { type: Boolean, default: false },
    onlyRatedBidder: { type: Boolean, default: false },
    status: { type: Number, default: ProductStatus.NORMAL },
  },
  { timestamps: true },
);
export const ProductModel = model<ProductDoc>(ProductModelName, ProductSchema);
