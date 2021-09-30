import { Document, model, Schema } from 'mongoose';
import { OtpDoc, OtpSchema } from '@/otp/otp.schema';

export enum UserRole {
  BIDDER,
  SELLER,
  ADMIN,
  SUPPER_ADMIN,
}

export interface User {
  email: string;
  dob?: Date;
  name: string;
  address: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  verifyOtp?: OtpDoc;
  passwordOtp?: OtpDoc;
  // validTokenTime: Date;
}

export type UserDoc = User & Document;

export const UserSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
    dob: Date,
    name: { type: String, required: true, maxlength: 30 },
    address: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, enum: UserRole, default: UserRole.BIDDER },
    isVerified: { type: Boolean, default: false },
    verifyOtp: OtpSchema,
    passwordOtp: OtpSchema,
  },
  { timestamps: true },
);

export const UserModel = model<UserDoc>('User', UserSchema);
