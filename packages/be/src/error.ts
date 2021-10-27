import type { ErrorRequestHandler } from 'express';

interface CustomError {
  statusCode: number;
  name: string;
  message: string;
}

enum CustomErrorName {
  BadRequest = 'BadRequest',
  NotFound = 'NotFound',
  Forbidden = 'Forbidden',
  Unauthorized = 'Unauthorized',
}

export class BadRequest extends Error implements CustomError {
  statusCode: number = 400;
  constructor(message: string) {
    super(message);
    this.name = CustomErrorName.BadRequest;
  }
}

export class NotFound extends Error implements CustomError {
  statusCode: number = 404;
  constructor(message: string) {
    super(message);
    this.name = CustomErrorName.NotFound;
  }
}

export class Forbidden extends Error implements CustomError {
  statusCode: number = 403;
  constructor(message: string) {
    super(message);
    this.name = CustomErrorName.Forbidden;
  }
}
export class Unauthorized extends Error implements CustomError {
  statusCode: number = 401;
  constructor(message: string) {
    super(message);
    this.name = CustomErrorName.Unauthorized;
  }
}

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  res.status(+err.statusCode || +err.status || 500);
  if (err.name) {
    return res.json({
      message: err.message,
      error: err.name,
    });
  }
  return res.json({
    message: 'Internal server error',
    error: err.message,
  });
};

const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  req,
  res,
  next,
) => {
  if (
    // ES2016
    err instanceof BadRequest ||
    err instanceof NotFound ||
    err instanceof Forbidden ||
    err instanceof Unauthorized
    // ES2015
    // err.name === CustomErrorName.BadRequest ||
    // err.name === CustomErrorName.NotFound ||
    // err.name === CustomErrorName.Forbidden ||
    // err.name === CustomErrorName.Unauthorized
  ) {
    const { message, name, statusCode } = err;
    return res.status(statusCode).json({
      error: name,
      message: message || name,
    });
  }
  next(err);
};

export default errorHandler;
