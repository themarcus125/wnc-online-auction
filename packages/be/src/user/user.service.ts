import { CreateUserDTO } from './user.dto';
import { UserModel, UserDoc } from './user.schema';
import BaseService from '@/utils/base.service';
import { validateEmail } from '@/utils/validator';
import { comparePassword } from '@/utils/password';

export enum CheckEmailMessage {
  VALID,
  INVALID,
  NONUNIQUE,
}

export const getCheckEmailMessage = (e: CheckEmailMessage) => {
  if (e === CheckEmailMessage.INVALID) {
    return 'INVALID';
  }
  if (e === CheckEmailMessage.NONUNIQUE) {
    return 'NONUNIQUE';
  }
  return 'VALID';
};

export enum CheckPasswordMessage {
  VALID,
  SHORT,
  SAME,
}

export enum EmailOtpMessage {
  VERIFIED,
  NO_OTP,
  EXPIRED,
  WRONG_OTP,
}

export const getEmailOtpMessage = (e: EmailOtpMessage) => {
  if (e === EmailOtpMessage.NO_OTP) {
    return 'NO_OTP';
  }
  if (e === EmailOtpMessage.EXPIRED) {
    return 'EXPIRED';
  }
  if (e === EmailOtpMessage.WRONG_OTP) {
    return 'WRONG_OTP';
  }
  return 'VERIFIED';
};

class UserService extends BaseService<UserDoc, CreateUserDTO> {
  constructor() {
    super(UserModel);
  }

  async checkEmail(email: string) {
    const isEmail = validateEmail(email);
    if (!isEmail) return CheckEmailMessage.INVALID;
    const isNonUnique = await this.model.exists({ email });
    if (isNonUnique) return CheckEmailMessage.NONUNIQUE;
    return CheckEmailMessage.VALID;
  }

  checkPassword(password: string, hashedPassword?: string) {
    const isPassword = password.length >= 6;
    if (!isPassword) return CheckPasswordMessage.SHORT;
    if (hashedPassword && comparePassword(password, hashedPassword))
      return CheckPasswordMessage.SAME;
    return CheckPasswordMessage.VALID;
  }

  changeEmail(id: string, email: string) {
    return this.update(
      { _id: id },
      {
        email,
        isVerified: false,
        $unset: {
          verifyOtp: true,
        },
      },
    );
  }

  verifyEmailOTP = async (user: UserDoc, otp: string) => {
    if (user.isVerified) {
      return EmailOtpMessage.VERIFIED;
    }
    if (!user.verifyOtp) {
      return EmailOtpMessage.NO_OTP;
    }
    if (
      Date.now() - new Date(user.verifyOtp.createdAt).getTime() >=
      5 * 60 * 1000
    ) {
      return EmailOtpMessage.EXPIRED;
    }
    if (user.verifyOtp.key !== otp) {
      return EmailOtpMessage.WRONG_OTP;
    }
    await user.verifyOtp.remove();
    await user.save();
    return EmailOtpMessage.VERIFIED;
  };
}

export default new UserService();
