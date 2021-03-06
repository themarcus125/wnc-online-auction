import { JWTPayload } from '@/auth/auth.dto';
import { sendMail } from '@/mail/mail.service';
import OtpService from '@/user/otp/otp.service';
import { tag } from '@/utils/html';
import { comparePassword, getHashedPassword } from '@/utils/password';
import { RequestHandler } from 'express';
import { UpdateUserDTO } from './user.dto';
import UserService from './user.service';
import {
  CheckEmailMessage,
  EmailOtpMessage,
  ResetPasswordOtpMessage,
} from './user.message';
import UpgradeRequestService from '@/upgrade-request/upgradeRequest.service';
import { excludeString, UserDoc } from './user.schema';
import { BadRequest, Forbidden, NotFound } from '@/error';

const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const user = await UserService.findById(id).select(excludeString);
    if (!user) {
      return next(new NotFound('USER'));
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload;
    const { name, dob, address }: UpdateUserDTO = req.body;
    const user = await UserService.findOneAndUpdate(
      { _id: id },
      {
        name,
        dob,
        address,
      },
    ).select(excludeString);
    if (!user) {
      return next(new NotFound('USER'));
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
      return next(new NotFound('USER'));
    }
    const { oldPassword, newPassword } = req.body;
    const isPass = comparePassword(oldPassword, user.password);
    if (!isPass) {
      return next(new BadRequest('WRONG_OLD_PASS'));
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
      return next(new BadRequest(isEmailMessage));
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
      return next(new BadRequest(isEmailMessage));
    }
    const newUser = await UserService.changeEmail(id, email).select(
      excludeString,
    );
    res.json(newUser);
  } catch (e) {
    next(e);
  }
};

const sendResetPasswordOTP: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const otp = OtpService.createOtp();
    const user = await UserService.findOneAndUpdate(
      { email },
      { passwordOtp: otp },
    );
    if (!user) {
      return next(new NotFound('USER'));
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
    const { email, password, otp } = req.body;
    const user = await UserService.findOne({ email });
    if (!user) {
      return next(new NotFound('USER'));
    }
    const resetPasswordMessage = await UserService.resetPassword(
      user,
      otp,
      password,
    );
    if (resetPasswordMessage !== ResetPasswordOtpMessage.SUCCESS) {
      return next(new BadRequest(resetPasswordMessage));
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
    const otp = OtpService.createOtp();
    const user = await UserService.findOneAndUpdate(
      { _id: id, email },
      { verifyOtp: otp },
    );
    if (!user) {
      return next(new NotFound('USER'));
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
    const { otp } = req.body;
    const user = await UserService.findById(id);
    if (!user) {
      return next(new NotFound('USER'));
    }
    const emailOtpMessage = await UserService.verifyEmailOTP(user, otp);
    if (emailOtpMessage !== EmailOtpMessage.VERIFIED) {
      return next(new BadRequest(emailOtpMessage));
    }
    res.json({
      status: emailOtpMessage,
    });
  } catch (e) {
    next(e);
  }
};

export const createRequest: RequestHandler = async (req, res, next) => {
  try {
    const user: UserDoc = res.locals.user;
    const canRequest = await UpgradeRequestService.canRequest(user);
    if (!canRequest) {
      return next(new Forbidden('CAN_NOT_REQUEST'));
    }
    const request = await UpgradeRequestService.create({ user: user._id });
    if (!request) {
      return next(new Error('SOMETHING_WENT_WRONG'));
    }
    res.json({
      status: 'OK',
    });
  } catch (e) {
    next(e);
  }
};

export const getUserRequest: RequestHandler = async (req, res, next) => {
  try {
    const user: UserDoc = res.locals.user;
    const requests = await UpgradeRequestService.find({ user: user._id }).sort({
      _id: -1,
    });
    const canRequest = await UpgradeRequestService.canRequest(
      user,
      requests[0],
    );
    res.json({ requests, canRequest });
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
  getUserRequest,
  createRequest,
};
