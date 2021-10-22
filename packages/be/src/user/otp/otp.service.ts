import { otpGen } from '@/utils/password';
import { otpConfig } from '~/config';

export const getOtpLength = () => {
  return otpConfig.length;
};

const createOtp = () => {
  const now = new Date();
  return {
    key: otpGen(getOtpLength()),
    updatedAt: now,
    createdAt: now,
  };
};

export default {
  getOtpLength,
  createOtp,
};
