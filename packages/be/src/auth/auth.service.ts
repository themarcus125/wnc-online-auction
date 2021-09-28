import jwt from 'jsonwebtoken';

import { appConfig } from '~/config';

import UserService from '@/user/user.service';
import { UserDoc } from '@/user/user.schema';
import { CreateUserDTO } from '@/user/user.dto';
import { getHashedPassword, comparePassword } from '@/utils/password';

import { LoginDTO, JWTResponse, JWTPayload } from './auth.dto';

const register = ({ email, name, address, password }: CreateUserDTO) => {
  const hashedPassword = getHashedPassword(password);
  return UserService.create({
    email,
    name,
    address,
    password: hashedPassword,
  });
};

export enum LoginMessage {
  SUCCESS,
  NOEMAIL,
  WRONGPASS,
}

const login = async ({ email, password }: LoginDTO) => {
  const user = await UserService.findOne({ email });
  if (!user) {
    return {
      status: LoginMessage.NOEMAIL,
    };
  }
  const isPass = comparePassword(password, user.password);
  if (!isPass) {
    return {
      status: LoginMessage.WRONGPASS,
    };
  }
  const jwtResponse = sign(user);
  return {
    status: LoginMessage.SUCCESS,
    jwtResponse,
  };
};

const sign = ({ _id, email, role, isVerified }: UserDoc): JWTResponse => {
  const payload: JWTPayload = {
    id: _id,
    email,
    role,
    isVerified,
  };
  const { expirationTime, jwtSecret } = appConfig;
  const iat = new Date().getTime();
  const accessToken = jwt.sign(payload, jwtSecret);
  return {
    accessToken,
    expiresIn: expirationTime,
    expiresAt: iat + expirationTime * 1000,
  };
};

const resign = (payload: JWTPayload): JWTResponse => {
  const { expirationTime, jwtSecret } = appConfig;
  const iat = new Date().getTime();
  const accessToken = jwt.sign(payload, jwtSecret);
  return {
    accessToken,
    expiresIn: expirationTime,
    expiresAt: iat + expirationTime * 1000,
  };
};

const verify = (token: string) => {
  const { jwtSecret } = appConfig;
  return jwt.verify(token, jwtSecret) as JWTPayload;
};

export enum EmailOtpMessage {
  VERIFIED,
  NO_OTP,
  EXPIRED,
  WRONG_OTP,
}

const verifyEmailOTP = async (user: UserDoc, otp: string) => {
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

export default {
  register,
  login,
  sign,
  verify,
  resign,
};
