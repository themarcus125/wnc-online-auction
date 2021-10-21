import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { UserDoc, UserModelName } from '@/user/user.schema';
// import { ProductDoc } from '@/product/product.schema';

export const RatingModelName = 'Rating';

export interface Rating {
  createUser: PopulatedDoc<UserDoc>;
  targetUser: PopulatedDoc<UserDoc>;
  // product: PopulatedDoc<ProductDoc>;
  feedback: string;
  score: boolean;
}

export type RatingDoc = Rating & Document;

export const RatingSchema = new Schema<RatingDoc>(
  {
    createUser: {
      type: Schema.Types.ObjectId,
      ref: UserModelName,
      required: true,
    },
    targetUser: {
      type: Schema.Types.ObjectId,
      ref: UserModelName,
      required: true,
    },
    feedback: { type: String, required: true },
    score: { type: Boolean, required: true },
  },
  { timestamps: true },
);

RatingSchema.index({ createUser: 1, targetUser: 1 }, { unique: true });

export const RatingModel = model<RatingDoc>(RatingModelName, RatingSchema);
