import { ProductDoc, ProductModelName } from '@/product/product.schema';
import { UserDoc, UserModelName } from '@/user/user.schema';
import { Document, model, PopulatedDoc, Schema } from 'mongoose';

export enum BidStatus {
  NORMAL,
  REJECTED,
  WAITING,
  APPROVED,
  CANCELED,
}

export const BidModelName = 'Bid';

export interface Bid {
  product: PopulatedDoc<ProductDoc>;
  bidder: PopulatedDoc<UserDoc>;
  price: number;
  maxAutoPrice?: number;
  createdAt: Date;
  status: BidStatus;
}

export type BidDoc = Bid & Document;

export const BidSchema = new Schema<BidDoc>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: ProductModelName,
      required: true,
    },
    bidder: { type: Schema.Types.ObjectId, ref: UserModelName, required: true },
    price: { type: Number, required: true },
    maxAutoPrice: Number,
    status: { type: Number, default: BidStatus.NORMAL },
  },
  { timestamps: true },
);

export const BidModel = model<BidDoc>(BidModelName, BidSchema);
