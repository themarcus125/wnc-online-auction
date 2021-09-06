import { RequestHandler } from 'express';
import UserService from './user.service';

const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = res.locals.jwtPayload || {};
    console.log(res.locals);
    if (!id) {
      return res.status(401).json({
        error: 'NO_AUTH',
      });
    }
    const user = await UserService.findUserById(id);
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

export default {
  getUser,
};
