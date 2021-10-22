import { Forbidden } from '@/error';
import { RequestHandler } from 'express';

import { JWTPayload, LoginDTO, RegisterDTO } from './auth.dto';
import { LoginMessage } from './auth.message';
import AuthService from './auth.service';

const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, name, address, password }: RegisterDTO = req.body;
    const user = await AuthService.register({ email, name, address, password });
    if (!user) {
      throw new Error('Something went wrong');
    }
    res.json({ id: user._id });
  } catch (e) {
    next(e);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password }: LoginDTO = req.body;
    const { message, jwtResponse } = await AuthService.login({
      email,
      password,
    });
    if (message !== LoginMessage.SUCCESS) {
      return next(new Forbidden(message));
    }
    return res.json({
      ...jwtResponse,
    });
  } catch (e) {
    next(e);
  }
};

const reSign: RequestHandler = (req, res, next) => {
  try {
    const jwtPayload: JWTPayload = res.locals.jwtPayload;
    const response = AuthService.reSign(jwtPayload);
    return res.json({
      ...response,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  reSign,
};
