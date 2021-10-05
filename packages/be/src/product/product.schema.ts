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
  currentPrice?: number;
  currentBidder?: PopulatedDoc<UserDoc>;
  expiredIn: number;
  createdAt: Date;
}

export type ProductDoc = Product & Document;

export const ProductSchema = new Schema<ProductDoc>(
  {
    name: { type: String, required: true, maxlength: 30 },
    descriptions: { type: [String], required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    images: {
      type: [String],
      required: true,
    },
    seller: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    startPrice: { type: Number, require: true },
    stepPrice: { type: Number, require: true },
    buyPrice: Number,
    expiredIn: { type: Number, require: true },
  },
  { timestamps: true },
);

export const ProductModel = model<ProductDoc>('Product', ProductSchema);
