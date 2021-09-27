import { RequestHandler } from 'express';
import { UpdateUserDTO } from './user.dto';
import UserService, { CheckEmailMessage } from './user.service';

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
    if (isEmail === CheckEmailMessage.INVALID) {
      return res.status(404).json({
        error: 'INVALID',
        isEmail: false,
      });
    }
    if (isEmail === CheckEmailMessage.NONUNIQUE) {
      return res.status(404).json({
        error: 'NONUNIQUE',
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

export default {
  getUser,
  updateUser,
  checkUserEmail,
};
