import { Document, model, Schema } from 'mongoose';
import OtpService from './otp.service';

export interface Otp {
  key: string;
  updatedAt: Date;
  createdAt: Date;
}

export type OtpDoc = Otp & Document;

export const OtpSchema = new Schema<OtpDoc>(
  {
    key: {
      type: String,
      maxlength: OtpService.getOtpLength(),
      minLength: OtpService.getOtpLength(),
      required: true,
    },
  },
  { timestamps: true },
);
