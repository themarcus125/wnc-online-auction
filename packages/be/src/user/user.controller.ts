import { JWTPayload } from '@/auth/auth.dto';
import { sendMail } from '@/mail/mail.service';
import OtpService from '@/otp/otp.service';
import { tag } from '@/utils/html';
import { RequestHandler } from 'express';
import { UpdateUserDTO } from './user.dto';
import UserService, {
  CheckEmailMessage,
  EmailOtpMessage,
  getCheckEmailMessage,
  getEmailOtpMessage,
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
    const { name, dob } = req.body as UpdateUserDTO;
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
    if (isEmail !== CheckEmailMessage.INVALID) {
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
    if (isEmail !== CheckEmailMessage.INVALID) {
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
  checkUserEmail,
  changeUserEmail,
  sendVerifyEmailOTP,
  verifyEmailOTP,
};
