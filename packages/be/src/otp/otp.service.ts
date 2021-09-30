import { otpGen } from '@/utils/password';
import { otpConfig } from '~/config';

const getOtpLength = () => {
  return otpConfig.length;
};

const createOtp = () => {
  return {
    key: otpGen(getOtpLength()),
    updatedAt: new Date(),
    createdAt: new Date(),
  };
};

export default {
  getOtpLength,
  createOtp,
};
