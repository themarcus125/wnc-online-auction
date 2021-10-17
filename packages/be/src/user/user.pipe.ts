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
    return res.status(400).json({
      error: 'INVALID_NAME',
    });
  }
  if (!validateDate(dob)) {
    return res.status(400).json({
      error: 'INVALID_DOB',
    });
  }
  if (!notEmpty(address)) {
    return res.status(400).json({
      error: 'INVALID_ADDRESS',
    });
  }
  next();
};

export const changeUserPasswordValidator: RequestHandler = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!validatePassword(newPassword)) {
    return res.status(400).json({
      error: 'INVALID_NEW_PASSWORD',
    });
  }
  if (!notEmpty(oldPassword)) {
    return res.status(400).json({
      error: 'INVALID_OLD_PASSWORD',
    });
  }
  if (oldPassword === newPassword) {
    return res.status(400).json({
      error: 'SAME_PASSWORD',
    });
  }
  next();
};

export const emailBodyValidator: RequestHandler = (req, res, next) => {
  const { email } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({
      error: 'INVALID_EMAIL',
    });
  }
  next();
};

export const resetPasswordValidator: RequestHandler = (req, res, next) => {
  const { email, password, otp } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({
      error: 'INVALID_EMAIL',
    });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({
      error: 'INVALID_PASSWORD',
    });
  }
  if (!validateOtp(otp)) {
    return res.status(400).json({
      error: 'INVALID_OTP',
    });
  }
  next();
};

export const verifyEmailOTPValidator: RequestHandler = (req, res, next) => {
  const { otp } = req.body;
  if (!validateOtp(otp)) {
    return res.status(400).json({
      error: 'INVALID_OTP',
    });
  }
  next();
};
