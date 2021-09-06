import { RequestHandler } from 'express';

import { LoginDTO, RegisterDTO } from './auth.dto';
import AuthService, { LoginMessage } from './auth.service';

const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, name, address, password } = req.body as RegisterDTO;
    const user = await AuthService.register({ email, name, address, password });
    if (!user) {
      throw new Error('Something went wrong');
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body as LoginDTO;
    const loginResponse = await AuthService.login({ email, password });
    if (loginResponse.status === LoginMessage.NOEMAIL) {
      return res.status(400).json({
        error: 'NO_EMAIL',
      });
    }
    if (loginResponse.status === LoginMessage.WRONGPASS) {
      return res.status(400).json({
        error: 'WRONG_PASS',
      });
    }
    return res.json({
      ...loginResponse.jwtResponse,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
};
