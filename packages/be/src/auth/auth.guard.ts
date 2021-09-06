import { RequestHandler } from 'express';
import AuthService from './auth.service';

export const userGuard: RequestHandler = (req, res, next) => {
  const bearerToken = req.header('authorization') || '';
  console.log(bearerToken);
  if (!bearerToken.startsWith('Bearer')) {
    return res.status(401).json({
      error: 'NOT_BEARER_TOKEN',
    });
  }
  const token = bearerToken.split(' ')[1] || '';
  if (!token) {
    return res.status(401).json({
      error: 'NO_BEARER_TOKEN',
    });
  }
  const verifiedToken = AuthService.verify(token);
  if (!verifiedToken) {
    return res.status(401).json({
      error: 'INVALID_TOKEN',
    });
  }
  res.locals.jwtPayload = verifiedToken;
  next();
};
