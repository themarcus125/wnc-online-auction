import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { UserDoc, UserModelName } from '../user/user.schema';

export enum RequestStatus {
  PENDING,
  APPROVED,
  REJECTED,
}

export const UpgradeRequestModelName = 'UpgradeRequest';

export interface UpgradeRequest {
  user: PopulatedDoc<UserDoc>;
  approver: PopulatedDoc<UserDoc>;
  status: RequestStatus;
  createdAt: Date;
  expiredIn: number; // sec
}

export type UpgradeRequestDoc = UpgradeRequest & Document;

export const UpgradeRequestSchema = new Schema<UpgradeRequestDoc>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: UserModelName },
    approver: { type: Schema.Types.ObjectId, ref: UserModelName },
    status: { type: Number, default: RequestStatus.PENDING },
    expiredIn: { type: Number, default: 7 * 24 * 3600 },
  },
  { timestamps: true },
);

export const UpgradeRequestModel = model<UpgradeRequestDoc>(
  UpgradeRequestModelName,
  UpgradeRequestSchema,
);
