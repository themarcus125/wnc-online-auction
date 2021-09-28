import { otpGen } from '@/utils/password';
import { otpConfig } from '~/config';
import { OtpModel } from './otp.schema';

const getOtpLength = () => {
  return otpConfig.length;
};

const createOtp = () => {
  return OtpModel.create({
    key: otpGen(getOtpLength()),
  });
};

export default {
  getOtpLength,
  createOtp,
};
