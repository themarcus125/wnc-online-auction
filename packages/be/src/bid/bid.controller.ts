import { JWTPayload } from '@/auth/auth.dto';
import { RequestHandler } from 'express';

const bid: RequestHandler = (req, res, next) => {
  try {
    const { id }: JWTPayload = res.locals.jwtPayload;
    const { productId } = req.body;
  } catch (e) {
    next(e);
  }
};

export default {
  bid,
};
