import type { ErrorRequestHandler } from 'express';

interface CustomError {
  statusCode: number;
  name: string;
  message: string;
}

export class BadRequest extends Error implements CustomError {
  statusCode: number = 400;
  constructor(message: string) {
    super(message);
    this.name = 'BadRequest';
  }
}

export class NotFound extends Error implements CustomError {
  statusCode: number = 404;
  constructor(message: string) {
    super(message);
    this.name = 'NotFound';
  }
}

export class Forbidden extends Error implements CustomError {
  statusCode: number = 403;
  constructor(message: string) {
    super(message);
    this.name = 'Forbidden';
  }
}
export class Unauthorized extends Error implements CustomError {
  statusCode: number = 401;
  constructor(message: string) {
    super(message);
    this.name = 'Unauthorized';
  }
}

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  res.status(err.status || 500);
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

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (
    err instanceof BadRequest ||
    err instanceof NotFound ||
    err instanceof Forbidden ||
    err instanceof Unauthorized
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
