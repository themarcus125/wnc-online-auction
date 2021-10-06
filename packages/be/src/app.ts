import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import type { ErrorRequestHandler } from 'express';

import router from './routers';
import { badRequestHandler } from './error';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(router);
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'NotFound',
    message: 'Not Found',
  });
});

app.use(badRequestHandler);
app.use(((err, req, res, next) => {
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
}) as ErrorRequestHandler);

export default app;
