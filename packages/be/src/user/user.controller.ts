import { JWTPayload } from '@/auth/auth.dto';
import { sendMail } from '@/mail/mail.service';
import OtpService from '@/otp/otp.service';
import { tag } from '@/utils/html';
import { getHashedPassword } from '@/utils/password';
import { RequestHandler } from 'express';
import { UpdateUserDTO } from './user.dto';
import UserService, {
  CheckEmailMessage,
  CheckPasswordMessage,
  EmailOtpMessage,
  getCheckEmailMessage,
  getEmailOtpMessage,
  getResetPasswordOtpMessage,
  ResetPasswordOtpMessage,
} from './user.service';

const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload || {};
    if (!id) {
      return res.status(401).json({
        error: 'NO_AUTH',
      });
    }
    const user = await UserService.findById(id).select('-password');
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
    const { id } = res.locals.jwtPayload || {};
    if (!id) {
      return res.status(401).json({
        error: 'NO_AUTH',
      });
    }
    const { name, dob }: UpdateUserDTO = req.body;
    const user = await UserService.update(
      { _id: id },
      {
        name,
        dob,
      },
    ).select('-password');
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
    const { id } = res.locals.jwtPayload || {};
    if (!id) {
      return res.status(401).json({
        error: 'NO_AUTH',
      });
    }
    const { password }: UpdateUserDTO = req.body;
    const isPassword = UserService.checkPassword(password || '');
    if (!password || isPassword !== CheckPasswordMessage.VALID) {
      return res.status(400).json({
        error: 'INVALID_NEW_PASSWORD',
      });
    }
    const hashedPassword = getHashedPassword(password);
    const user = await UserService.update(
      { _id: id },
      {
        password: hashedPassword,
      },
    ).select('-password');
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

const checkUserEmail: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload || {};
    if (!id) {
      return res.status(401).json({
        error: 'NO_AUTH',
      });
    }
    const { email } = req.body;
    const isEmail = await UserService.checkEmail(email);
    if (isEmail !== CheckEmailMessage.VALID) {
      return res.status(404).json({
        error: getCheckEmailMessage(isEmail),
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
    const { id } = res.locals.jwtPayload || {};
    if (!id) {
      return res.status(401).json({
        error: 'NO_AUTH',
      });
    }
    const { email } = req.body;
    const isEmail = await UserService.checkEmail(email);
    if (isEmail !== CheckEmailMessage.VALID) {
      return res.status(404).json({
        error: getCheckEmailMessage(isEmail),
        isEmail: false,
      });
    }
    const newUser = await UserService.changeEmail(id, email).select(
      '-password',
    );
    res.json(newUser);
  } catch (e) {
    next(e);
  }
};

const sendResetPasswordOTP: RequestHandler = async (req, res, next) => {
  try {
    const { id, email }: JWTPayload = res.locals.jwtPayload || {};
    if (!id) {
      return res.status(401).json({
        error: 'NO_AUTH',
      });
    }
    const otp = await OtpService.createOtp();
    const user = await UserService.update(
      { _id: id, email },
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
    const isSuccess = await UserService.resetPassword(user, otp, password);
    const message = getResetPasswordOtpMessage(isSuccess);
    if (isSuccess !== ResetPasswordOtpMessage.SUCCESS) {
      return res.status(400).json({
        error: message,
      });
    }
    res.json({
      status: message,
    });
  } catch (e) {
    next(e);
  }
};

const sendVerifyEmailOTP: RequestHandler = async (req, res, next) => {
  try {
    const { id, email }: JWTPayload = res.locals.jwtPayload || {};
    if (!id) {
      return res.status(401).json({
        error: 'NO_AUTH',
      });
    }
    const otp = await OtpService.createOtp();
    const user = await UserService.update(
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
    const { id }: JWTPayload = res.locals.jwtPayload || {};
    const otp: string = req.body.otp || '';
    if (!id) {
      return res.status(401).json({
        error: 'NO_AUTH',
      });
    }
    const user = await UserService.findById(id);
    if (!user) {
      return res.status(404).json({
        error: 'NOT_FOUND',
      });
    }
    const isVerified = await UserService.verifyEmailOTP(user, otp);
    const message = getEmailOtpMessage(isVerified);
    if (isVerified !== EmailOtpMessage.VERIFIED) {
      return res.status(400).json({
        error: message,
      });
    }
    res.json({
      status: message,
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
