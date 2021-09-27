import { Document, model, PopulatedDoc, Schema, Types } from 'mongoose';

export type CategoryDoc = Category & Document;

export interface Category {
  name: string;
  parent: PopulatedDoc<CategoryDoc>;
  isDel: boolean;
}

export const CategorySchema = new Schema<CategoryDoc>(
  {
    name: { type: String, required: true, maxlength: 30 },
    parent: { type: Schema.Types.ObjectId, ref: 'Category' },
    isDel: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const CategoryModel = model<CategoryDoc>('Category', CategorySchema);
