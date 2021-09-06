import jwt from 'jsonwebtoken';

import { appConfig } from '~/config';

import UserService from '@/user/user.service';
import { UserDoc } from '@/user/user.schema';
import { CreateUserDTO } from '@/user/user.dto';
import { getHashedPassword, comparePassword } from '@/utils/password';

import { LoginDTO, JWTResponse, JWTPayload } from './auth.dto';

const register = ({ email, name, address, password }: CreateUserDTO) => {
  const hashedPassword = getHashedPassword(password);
  return UserService.createUser({
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
  const user = await UserService.findUser({ email });
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

const sign = ({ _id, email, role }: UserDoc): JWTResponse => {
  const payload: JWTPayload = {
    id: _id,
    email,
    role,
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

const verify = async (token: string) => {
  const { jwtSecret } = appConfig;
  return jwt.verify(token, jwtSecret) as JWTPayload;
};

export default {
  register,
  login,
  sign,
  verify,
};
