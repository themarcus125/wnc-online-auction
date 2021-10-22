import { UserRole } from '@/user/user.schema';
import { RequestHandler } from 'express';
import { JWTPayload } from './auth.dto';
import AuthService, { getExpirationTime } from './auth.service';
import UserService from '@/user/user.service';
import { BadRequest, NotFound, Unauthorized } from '@/error';

export const tokenGuard =
  (isExpiredTokenGuard = false): RequestHandler =>
  async (req, res, next) => {
    const bearerToken = req.header('authorization') || '';
    if (!bearerToken) {
      return next(new BadRequest('NO_AUTHORIZATION_HEADER'));
    }
    if (!bearerToken.startsWith('Bearer')) {
      return next(new BadRequest('NOT_BEARER_TOKEN'));
    }
    const token = bearerToken.split(' ')[1] || '';
    if (!token) {
      return next(new BadRequest('NO_BEARER_TOKEN'));
    }

    const verifiedToken = AuthService.verify(token);
    if (!verifiedToken) {
      return next(new Unauthorized('INVALID_TOKEN'));
    }

    if (isExpiredTokenGuard) {
      const expirationTime = getExpirationTime();
      if (
        verifiedToken.expiredAt &&
        Date.now() - new Date(verifiedToken.expiredAt).getTime() >=
          expirationTime * 1000
      ) {
        return next(new Unauthorized('EXPIRED_RESIGN_TOKEN'));
      }
    } else {
      if (verifiedToken.expiredAt) {
        return next(new Unauthorized('EXPIRED_TOKEN'));
      }
    }
    const user = await UserService.findById(verifiedToken.id);
    if (!user) {
      return next(new NotFound('USER'));
    }
    res.locals.jwtPayload = {
      id: user._id,
      isVerified: user.isVerified,
      role: user.role,
      email: user.email,
    };
    res.locals.user = user;
    next();
  };

export const roleGuard =
  (role: UserRole, exact: boolean = true): RequestHandler =>
  (req, res, next) => {
    const jwtPayload: JWTPayload = res.locals.jwtPayload;
    if (!jwtPayload) {
      return next(new Unauthorized('NO_PAYLOAD'));
    }
    if (!jwtPayload.role) {
      return next(new Unauthorized('NO_ROLE_PAYLOAD'));
    }
    if (exact) {
      if (jwtPayload.role !== role) {
        return next(new Unauthorized('INVALID_TOKEN_ROLE'));
      }
    } else if (jwtPayload.role < role) {
      return next(new Unauthorized('INVALID_TOKEN_ROLE'));
    }
    next();
  };

export const emailGuard =
  (isVerified: boolean): RequestHandler =>
  (req, res, next) => {
    const jwtPayload: JWTPayload = res.locals.jwtPayload;
    if (!jwtPayload) {
      return next(new Unauthorized('NO_PAYLOAD'));
    }
    if (jwtPayload.isVerified !== isVerified) {
      return next(
        new Unauthorized(`${isVerified ? 'UNVERIFIED' : 'VERIFIED'}_EMAIL`),
      );
    }
    next();
  };
