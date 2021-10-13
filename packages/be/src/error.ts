import type { ErrorRequestHandler } from 'express';

export class BadRequest extends Error {
  code: number = 400;
  constructor(message: string) {
    super(message);
    this.name = 'BadRequest';
  }
}

export const badRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof BadRequest) {
    console.log('if');
    const { message, name } = err;
    return res
      .status(err.code)
      .json({
        error: name,
        message: message || name,
      })
      .end();
  }
  next(err);
};

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
