import { BadRequest } from '@/error';
import {
  length,
  notEmpty,
  validateEmail,
  validatePassword,
  validateDate,
  validateOtp,
} from '@/utils/validator';
import { RequestHandler } from 'express';
import { UpdateUserDTO } from './user.dto';

export const updateUserValidator: RequestHandler = (req, res, next) => {
  const { name, dob, address }: UpdateUserDTO = req.body;
  if (!length(name, 1, 30)) {
    return next(new BadRequest('INVALID_NAME'));
  }
  if (!validateDate(dob)) {
    return next(new BadRequest('INVALID_DOB'));
  }
  if (!notEmpty(address)) {
    return next(new BadRequest('INVALID_ADDRESS'));
  }
  next();
};

export const changeUserPasswordValidator: RequestHandler = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!validatePassword(newPassword)) {
    return next(new BadRequest('INVALID_NEW_PASSWORD'));
  }
  if (!notEmpty(oldPassword)) {
    return next(new BadRequest('INVALID_OLD_PASSWORD'));
  }
  if (oldPassword === newPassword) {
    return next(new BadRequest('SAME_PASSWORD'));
  }
  next();
};

export const emailBodyValidator: RequestHandler = (req, res, next) => {
  const { email } = req.body;
  if (!validateEmail(email)) {
    return next(new BadRequest('INVALID_EMAIL'));
  }
  next();
};

export const resetPasswordValidator: RequestHandler = (req, res, next) => {
  const { email, password, otp } = req.body;
  if (!validateEmail(email)) {
    return next(new BadRequest('INVALID_EMAIL'));
  }
  if (!validatePassword(password)) {
    return next(new BadRequest('INVALID_PASSWORD'));
  }
  if (!validateOtp(otp)) {
    return next(new BadRequest('INVALID_OTP'));
  }
  next();
};

export const verifyEmailOTPValidator: RequestHandler = (req, res, next) => {
  const { otp } = req.body;
  if (!validateOtp(otp)) {
    return next(new BadRequest('INVALID_OTP'));
  }
  next();
};
