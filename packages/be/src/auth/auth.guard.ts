import { UserRole } from '@/user/user.schema';
import { RequestHandler } from 'express';
import { JWTPayload } from './auth.dto';
import AuthService from './auth.service';
import UserService from '@/user/user.service';

export const tokenGuard: RequestHandler = async (req, res, next) => {
  const bearerToken = req.header('authorization') || '';
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
  const user = await UserService.findById(verifiedToken.id);
  if (!user) {
    return res.status(404).json({
      error: 'NOT_FOUND_USER',
    });
  }
  res.locals.jwtPayload = {
    id: user._id,
    isVerified: user.isVerified,
    role: user.role,
    email: user.email,
  } as JWTPayload;
  next();
};

export const roleGuard =
  (role: UserRole): RequestHandler =>
  (req, res, next) => {
    const jwtPayload: JWTPayload = res.locals.jwtPayload;
    if (!jwtPayload) {
      return res.status(401).json({
        error: 'INVALID_TOKEN',
      });
    }
    if (jwtPayload.role !== role) {
      return res.status(401).json({
        error: 'INVALID_TOKEN_ROLE',
      });
    }
    next();
  };

export const emailGuard =
  (mode: boolean): RequestHandler =>
  (req, res, next) => {
    const jwtPayload: JWTPayload = res.locals.jwtPayload;
    if (!jwtPayload) {
      return res.status(401).json({
        error: 'INVALID_TOKEN',
      });
    }
    if (jwtPayload.isVerified !== mode) {
      return res.status(401).json({
        error: `${mode ? 'UNVERIFIED' : 'VERIFIED'}_EMAIL`,
      });
    }
    next();
  };
