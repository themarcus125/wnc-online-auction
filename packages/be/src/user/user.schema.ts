import { Document, model, Schema } from 'mongoose';

export enum UserRole {
  BIDDER,
  SELLER,
  ADMIN,
}

export interface User {
  email: string;
  name: string;
  address: string;
  password: string;
  role: UserRole;
}

export type UserDoc = User & Document;

export const UserSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
    name: { type: String, required: true, maxlength: 30 },
    address: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, enum: UserRole, default: UserRole.BIDDER },
  },
  { timestamps: true },
);

export const UserModel = model<UserDoc>('User', UserSchema);
