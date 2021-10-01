import { UserRole } from '@/user/user.schema';
import { RequestHandler } from 'express';
import { JWTPayload } from './auth.dto';
import AuthService, { getExpirationTime } from './auth.service';
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
  if (verifiedToken.expiredAt) {
    return res.status(401).json({
      error: 'EXPIRED_TOKEN',
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
  res.locals.user = user;
  next();
};

export const expiredTokenGuard: RequestHandler = async (req, res, next) => {
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
  const expirationTime = getExpirationTime();
  if (
    verifiedToken.expiredAt &&
    Date.now() - new Date(verifiedToken.expiredAt).getTime() >=
      expirationTime * 1000
  ) {
    return res.status(401).json({
      error: 'EXPIRED_RESIGN_TOKEN',
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
  res.locals.user = user;
  next();
};

export const roleGuard =
  (role: UserRole, exact: boolean = true): RequestHandler =>
  (req, res, next) => {
    const jwtPayload: JWTPayload = res.locals.jwtPayload;
    if (!jwtPayload) {
      return res.status(401).json({
        error: 'INVALID_TOKEN',
      });
    }
    if (exact) {
      if (jwtPayload.role !== role) {
        return res.status(401).json({
          error: 'INVALID_TOKEN_ROLE',
        });
      }
    } else if (jwtPayload.role < role) {
      return res.status(401).json({
        error: 'INVALID_TOKEN_ROLE',
      });
    }
    next();
  };

export const emailGuard =
  (isVerified: boolean): RequestHandler =>
  (req, res, next) => {
    const jwtPayload: JWTPayload = res.locals.jwtPayload;
    if (!jwtPayload) {
      return res.status(401).json({
        error: 'INVALID_TOKEN',
      });
    }
    if (jwtPayload.isVerified !== isVerified) {
      return res.status(401).json({
        error: `${isVerified ? 'UNVERIFIED' : 'VERIFIED'}_EMAIL`,
      });
    }
    next();
  };
