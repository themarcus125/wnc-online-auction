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
    const loginResponse = await AuthService.login({ email, password });
    if (loginResponse.status !== LoginMessage.SUCCESS) {
      return res.status(400).json({
        error: loginResponse.status,
      });
    }
    return res.json({
      ...loginResponse.jwtResponse,
    });
  } catch (e) {
    next(e);
  }
};

const resign: RequestHandler = (req, res, next) => {
  try {
    const jwtPayload: JWTPayload = res.locals.jwtPayload;
    const response = AuthService.resign(jwtPayload);
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
  resign,
};
