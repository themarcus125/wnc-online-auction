import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { UserDoc } from '@/user/user.schema';
import { CategoryDoc, CategoryModel } from '@/category/category.schema';

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
  expiredIn: number;
  createdAt: Date;
  remainingTime?: number;
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
    currentPrice: { type: Number, require: true },
    currentBidder: { type: Schema.Types.ObjectId, ref: 'User' },
    bidCount: { type: Number, default: 0 },
    expiredIn: { type: Number, require: true },
  },
  { timestamps: true },
);
export const ProductModel = model<ProductDoc>('Product', ProductSchema);
ProductSchema.index({ name: 'text' });

export const remainingTimePipeline: any[] = [
  {
    $addFields: {
      remainingTime: {
        $subtract: [
          {
            $add: [
              '$createdAt',
              {
                $multiply: ['$expiredIn', 3600 * 1000],
              },
            ],
          },
          '$$NOW',
        ],
      },
    },
  },
];

export const expiredAtPipeline: any[] = [
  {
    $addFields: {
      expiredAt: {
        $add: [
          '$createdAt',
          {
            $multiply: ['$expiredIn', 3600 * 1000],
          },
        ],
      },
    },
  },
];

export const productJoinCategoryPipeline: any[] = [
  {
    $lookup: {
      from: CategoryModel.collection.collectionName,
      localField: 'category',
      foreignField: '_id',
      as: 'category',
    },
  },
  { $unwind: '$category' },
];
