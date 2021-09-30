import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { UserDoc } from '@/user/user.schema';
import { CategoryDoc } from '@/category/category.schema';

export interface Product {
  name: string;
  description: string;
  category: PopulatedDoc<CategoryDoc>;
  images: string[];
  seller: PopulatedDoc<UserDoc>;
  startPrice: number;
  stepPrice: number;
  buyPrice?: number;
  currentPrice?: number;
  currentBidder?: PopulatedDoc<UserDoc>;
  expiredAt: Date;
  createdAt: Date;
}

export type ProductDoc = Product & Document;

export const ProductSchema = new Schema<ProductDoc>(
  {
    name: { type: String, required: true, maxlength: 30 },
    description: { type: String, required: true, maxlength: 200 },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    images: {
      type: [String],
      required: true,
    },
    seller: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    startPrice: { type: Number, require: true },
    stepPrice: { type: Number, require: true },
    buyPrice: Number,
    expiredAt: { type: Date, require: true },
  },
  { timestamps: true },
);

export const ProductModel = model<ProductDoc>('Product', ProductSchema);
