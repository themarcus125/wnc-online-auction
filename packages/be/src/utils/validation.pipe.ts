import { RequestHandler } from 'express';
import { notEmpty, validatePassword } from './validator';

const baseValidation =
  (
    where: string,
    field: string,
    validator: (v: any) => boolean = notEmpty,
  ): RequestHandler =>
  (req, res, next) => {
    const dict: Record<string, any> = {
      body: req.body,
      query: req.query,
      params: req.params,
    };
    if (!dict[where]) {
      return res.status(400).json({
        error: 'EMPTY_REQUEST',
      });
    }
    const value = dict[where][field];
    const isValid = validator(value);
    if (!isValid) {
      return res.status(400).json({
        error: `INVALID_${field.toUpperCase()}`,
      });
    }
    next();
  };

export const passwordBodyValidation = baseValidation(
  'body',
  'password',
  validatePassword,
);
