import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { UserDoc } from '@/user/user.schema';
import { CategoryDoc } from '@/category/category.schema';
import { RatingDoc } from '@/rating/rating.schema';
import {
  ProductModelName,
  UserModelName,
  RatingModelName,
  CategoryModelName,
} from '@/db/modelName';

export enum ProductStatus {
  NORMAL,
  SOLD,
  CANCELED,
}

export interface Product {
  name: string;
  descriptions: string[];
  category: PopulatedDoc<CategoryDoc>;
  images: string[];
  seller: PopulatedDoc<UserDoc>;
  bidder: string[];
  startPrice: number;
  stepPrice: number;
  buyPrice?: number;
  currentPrice: number;
  currentBidder?: PopulatedDoc<UserDoc>;
  bidCount: number;
  expiredAt: Date;
  createdAt: Date;
  isAutoRenew?: boolean;
  onlyRatedBidder?: boolean;
  winnerRating?: PopulatedDoc<RatingDoc>;
  sellerRating?: PopulatedDoc<RatingDoc>;
  status: number;
}

export type ProductDoc = Product & Document;

export const ProductSchema = new Schema<ProductDoc>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 300,
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
    bidder: [String],
    startPrice: { type: Number, require: true },
    stepPrice: { type: Number, require: true },
    buyPrice: Number,
    currentPrice: { type: Number, require: true, index: 1 },
    currentBidder: { type: Schema.Types.ObjectId, ref: UserModelName },
    bidCount: { type: Number, default: 0, index: 1 },
    expiredAt: { type: Date, require: true, index: 1 },
    isAutoRenew: { type: Boolean, default: false },
    onlyRatedBidder: { type: Boolean, default: false },
    status: { type: Number, default: ProductStatus.NORMAL },
    winnerRating: { type: Schema.Types.ObjectId, ref: RatingModelName },
    sellerRating: { type: Schema.Types.ObjectId, ref: RatingModelName },
  },
  { timestamps: true },
);
export const ProductModel = model<ProductDoc>(ProductModelName, ProductSchema);
