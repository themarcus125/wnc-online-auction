import { otpGen } from '@/utils/password';
import { OtpModel } from './otp.schema';

const getOtpLength = () => {
  return 6;
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
