import { BadRequest } from '@/error';
import {
  length,
  notEmpty,
  validateEmail,
  validatePassword,
} from '@/utils/validator';
import { RequestHandler } from 'express';
import { LoginDTO, RegisterDTO } from './auth.dto';

export const registerValidator: RequestHandler = (req, res, next) => {
  const { email, name, address, password }: RegisterDTO = req.body;
  if (!validateEmail(email)) {
    return next(new BadRequest('INVALID_EMAIL'));
  }
  if (!length(name, 1, 30)) {
    return next(new BadRequest('INVALID_NAME'));
  }
  if (!notEmpty(address)) {
    return next(new BadRequest('INVALID_ADDRESS'));
  }
  if (!validatePassword(password)) {
    return next(new BadRequest('INVALID_PASSWORD'));
  }
  next();
};

export const loginValidator: RequestHandler = (req, res, next) => {
  const { email, password }: LoginDTO = req.body;
  if (!validateEmail(email)) {
    return next(new BadRequest('INVALID_EMAIL'));
  }
  if (!notEmpty(password)) {
    return next(new BadRequest('INVALID_PASSWORD'));
  }
  next();
};
