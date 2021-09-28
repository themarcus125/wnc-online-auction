import { Document, model, Schema } from 'mongoose';

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
      maxlength: 7,
      minLength: 7,
      required: true,
    },
  },
  { timestamps: true },
);

export const OtpModel = model<OtpDoc>('Otp', OtpSchema);
