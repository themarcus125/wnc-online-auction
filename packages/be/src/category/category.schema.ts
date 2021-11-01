import { CategoryModelName } from '@/db/modelName';
import { Document, model, PopulatedDoc, Schema, Types } from 'mongoose';

export interface Category {
  name: string;
  parent: PopulatedDoc<CategoryDoc>;
  isDel: boolean;
}
export type CategoryDoc = Category & Document;

export const CategorySchema = new Schema<CategoryDoc>(
  {
    name: { type: String, required: true, maxlength: 30, index: 'text' },
    parent: { type: Schema.Types.ObjectId, ref: CategoryModelName },
    isDel: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const CategoryModel = model<CategoryDoc>(
  CategoryModelName,
  CategorySchema,
);
