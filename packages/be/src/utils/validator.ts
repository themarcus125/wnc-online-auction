import { getOtpLength } from '@/otp/otp.service';
import { safeInt } from './parser';

export const validateEmail = (val?: string): boolean => {
  if (!val) return false;
  const re: RegExp = /.+@.+\..+/;
  return re.test(val);
};

export const validatePassword = (val?: string): boolean => {
  if (!val) return false;
  return val.length >= 6;
};

export const notNull = (val?: any): boolean => {
  return !!val;
};

export const length = (
  val?: string | Array<any>,
  minLength?: number,
  maxLength?: number,
) => {
  if (!val) return false;
  if (minLength && val.length < minLength) {
    return false;
  }
  if (maxLength && val.length > maxLength) {
    return false;
  }
  return true;
};

export const validateDate = (val?: any) => {
  if (!val) return false;
  const ts = Date.parse(val);
  return !isNaN(ts);
};

export const validateOtp = (val?: any) => {
  if (!val) return false;
  const OTP_LENGTH = getOtpLength();
  if (val.length !== OTP_LENGTH) return false;
  return true;
};

export const validateInt = (max?: Number, min?: Number) => (val?: any) => {
  const [canParse, value] = safeInt(val);
  if (!canParse) {
    return false;
  }
  if (max && value > max) return false;
  if (min && value < min) return false;
  return true;
};
