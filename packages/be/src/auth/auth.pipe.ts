import {
  length,
  notNull,
  validateEmail,
  validatePassword,
} from '@/utils/validator';
import { RequestHandler } from 'express';
import { LoginDTO, RegisterDTO } from './auth.dto';

export const registerValidator: RequestHandler = (req, res, next) => {
  const { email, name, address, password }: RegisterDTO = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({
      errror: 'INVALID_EMAIL',
    });
  }
  if (!length(name, 1, 30)) {
    return res.status(400).json({
      errror: 'INVALID_NAME',
    });
  }
  if (!notNull(address)) {
    return res.status(400).json({
      errror: 'INVALID_ADDRESS',
    });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({
      errror: 'INVALID_PASSWORD',
    });
  }
  next();
};

export const loginValidator: RequestHandler = (req, res, next) => {
  const { email, password }: LoginDTO = req.body;
  if (!notNull(email)) {
    return res.status(400).json({
      errror: 'INVALID_EMAIL',
    });
  }
  if (!notNull(password)) {
    return res.status(400).json({
      errror: 'INVALID_PASSWORD',
    });
  }
  next();
};
