import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { UserDoc } from '@/user/user.schema';
import { CategoryDoc } from '@/category/category.schema';

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
  currentBidder?: PopulatedDoc<UserDoc>;
  bidCount: number;
  expiredAt: Date;
  createdAt: Date;
  isAutoRenew?: boolean;
  allowNoRatingBid?: boolean;
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
      ref: 'Category',
    },
    images: {
      type: [String],
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    startPrice: { type: Number, require: true },
    stepPrice: { type: Number, require: true },
    buyPrice: Number,
    currentPrice: { type: Number, require: true, index: 1 },
    currentBidder: { type: Schema.Types.ObjectId, ref: 'User' },
    bidCount: { type: Number, default: 0, index: 1 },
    expiredAt: { type: Date, require: true, index: 1 },
    isAutoRenew: { type: Boolean, default: false },
    allowNoRatingBid: { type: Boolean, default: true },
  },
  { timestamps: true },
);
export const ProductModel = model<ProductDoc>('Product', ProductSchema);
