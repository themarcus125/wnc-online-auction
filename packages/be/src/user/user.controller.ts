import { JWTPayload } from '@/auth/auth.dto';
import { sendMail } from '@/mail/mail.service';
import OtpService from '@/otp/otp.service';
import { tag } from '@/utils/html';
import { comparePassword, getHashedPassword } from '@/utils/password';
import { RequestHandler } from 'express';
import { UpdateUserDTO } from './user.dto';
import UserService from './user.service';
import {
  CheckEmailMessage,
  CheckPasswordMessage,
  EmailOtpMessage,
  ResetPasswordOtpMessage,
} from './user.message';

const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const user = await UserService.findById(id).select(
      '-password -verifyOtp -passwordOtp',
    );
    if (!user) {
      return res.status(404).json({
        error: 'NOT_FOUND',
      });
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const { name, dob }: UpdateUserDTO = req.body;
    const user = await UserService.findOneAndUpdate(
      { _id: id },
      {
        name,
        dob,
      },
    ).select('-password -verifyOtp -passwordOtp');
    if (!user) {
      return res.status(404).json({
        error: 'NOT_FOUND',
      });
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
};

const changeUserPassword: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const user = await UserService.findById(id);
    if (!user) {
      return res.status(404).json({
        error: 'NOT_FOUND',
      });
    }
    const { oldPassword, newPassword } = req.body;
    const isPass = comparePassword(oldPassword, user.password);
    if (!isPass) {
      return res.status(400).json({
        error: 'WRONG_OLD_PASS',
      });
    }
    const isPassword = UserService.checkPassword(newPassword || '');
    if (!newPassword || isPassword !== CheckPasswordMessage.VALID) {
      return res.status(400).json({
        error: 'INVALID_NEW_PASSWORD',
      });
    }
    const hashedPassword = getHashedPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    res.json({ id });
  } catch (e) {
    next(e);
  }
};

const checkUserEmail: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isEmailMessage = await UserService.checkEmail(email);
    if (isEmailMessage !== CheckEmailMessage.VALID) {
      return res.status(404).json({
        error: isEmailMessage,
        isEmail: false,
      });
    }
    res.json({
      isEmail: true,
    });
  } catch (e) {
    next(e);
  }
};

const changeUserEmail: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const { email } = req.body;
    const isEmailMessage = await UserService.checkEmail(email);
    if (isEmailMessage !== CheckEmailMessage.VALID) {
      return res.status(404).json({
        error: isEmailMessage,
        isEmail: false,
      });
    }
    const newUser = await UserService.changeEmail(id, email).select(
      '-password -verifyOtp -passwordOtp',
    );
    res.json(newUser);
  } catch (e) {
    next(e);
  }
};

const sendResetPasswordOTP: RequestHandler = async (req, res, next) => {
  try {
    const email = req.body.email || '';
    const otp = await OtpService.createOtp();
    const user = await UserService.findOneAndUpdate(
      { email },
      { passwordOtp: otp },
    );
    if (!user) {
      return res.status(404).json({
        error: 'NOT_FOUND',
      });
    }
    const info = await sendMail(
      [email],
      'Reset Password OTP',
      tag('p', `This is your OTP: ${tag('strong', otp.key)}`),
    ).catch((e) => null);
    res.json({
      status: info ? 'OK' : 'SEND_FAIL',
    });
  } catch (e) {
    next(e);
  }
};

const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const email = req.body.email || '';
    const password = req.body.password || '';
    const otp = req.body.otp || '';
    const user = await UserService.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: 'NOT_FOUND',
      });
    }
    if (!otp) {
      return res.status(400).json({
        error: 'INVALID_OTP',
      });
    }
    if (UserService.checkPassword(password) !== CheckPasswordMessage.VALID) {
      return res.status(400).json({
        error: 'INVALID_PASSWORD',
      });
    }
    const resetPasswordMessage = await UserService.resetPassword(
      user,
      otp,
      password,
    );
    if (resetPasswordMessage !== ResetPasswordOtpMessage.SUCCESS) {
      return res.status(400).json({
        error: resetPasswordMessage,
      });
    }
    res.json({
      status: resetPasswordMessage,
    });
  } catch (e) {
    next(e);
  }
};

const sendVerifyEmailOTP: RequestHandler = async (req, res, next) => {
  try {
    const { id, email }: JWTPayload = res.locals.jwtPayload;
    const otp = await OtpService.createOtp();
    const user = await UserService.findOneAndUpdate(
      { _id: id, email },
      { verifyOtp: otp },
    );
    if (!user) {
      return res.status(404).json({
        error: 'NOT_FOUND',
      });
    }
    const info = await sendMail(
      [email],
      'Verify Email OTP',
      tag('p', `This is your OTP: ${tag('strong', otp.key)}`),
    ).catch((e) => null);
    res.json({
      status: info ? 'OK' : 'SEND_FAIL',
    });
  } catch (e) {
    next(e);
  }
};

const verifyEmailOTP: RequestHandler = async (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const otp: string = req.body.otp || '';
    const user = await UserService.findById(id);
    if (!user) {
      return res.status(404).json({
        error: 'NOT_FOUND',
      });
    }
    const emailOtpMessage = await UserService.verifyEmailOTP(user, otp);
    if (emailOtpMessage !== EmailOtpMessage.VERIFIED) {
      return res.status(400).json({
        error: emailOtpMessage,
      });
    }
    res.json({
      status: emailOtpMessage,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  getUser,
  updateUser,
  changeUserPassword,
  checkUserEmail,
  changeUserEmail,
  sendResetPasswordOTP,
  resetPassword,
  sendVerifyEmailOTP,
  verifyEmailOTP,
};
