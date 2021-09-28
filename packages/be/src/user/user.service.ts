import { CreateUserDTO } from './user.dto';
import { UserModel, UserDoc } from './user.schema';
import BaseService from '@/utils/base.service';
import { validateEmail } from '@/utils/validator';
import { getHashedPassword } from '@/utils/password';
import {
  CheckEmailMessage,
  CheckPasswordMessage,
  EmailOtpMessage,
  ResetPasswordOtpMessage,
} from './user.message';

class UserService extends BaseService<UserDoc, CreateUserDTO> {
  constructor() {
    super(UserModel);
  }

  async checkEmail(email: string) {
    const isEmail = validateEmail(email);
    if (!isEmail) return CheckEmailMessage.INVALID;
    const isNonUnique = await this.model.exists({ email });
    if (isNonUnique) return CheckEmailMessage.NON_UNIQUE;
    return CheckEmailMessage.VALID;
  }

  checkPassword(password: string) {
    const isPassword = password.length >= 6;
    if (!isPassword) return CheckPasswordMessage.SHORT;
    return CheckPasswordMessage.VALID;
  }

  changeEmail(id: string, email: string) {
    return this.findOneAndUpdate(
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

  async resetPassword(user: UserDoc, otp: string, newPassword: string) {
    if (!user.passwordOtp) {
      return ResetPasswordOtpMessage.NO_OTP;
    }
    if (
      Date.now() - new Date(user.passwordOtp.createdAt).getTime() >=
      5 * 60 * 1000
    ) {
      return ResetPasswordOtpMessage.EXPIRED;
    }
    if (user.passwordOtp.key !== otp) {
      return ResetPasswordOtpMessage.WRONG_OTP;
    }
    const hashedPassword = getHashedPassword(newPassword);
    user.passwordOtp = undefined;
    user.password = hashedPassword;
    await user.save();
    return ResetPasswordOtpMessage.SUCCESS;
  }

  async verifyEmailOTP(user: UserDoc, otp: string) {
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
    user.isVerified = true;
    user.verifyOtp = undefined;
    await user.save();
    return EmailOtpMessage.VERIFIED;
  }
}

export default new UserService();
