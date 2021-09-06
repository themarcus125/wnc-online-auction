import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import type { ErrorRequestHandler } from 'express';

import router from './routers';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'NotFound',
    message: 'Not Found',
  });
});

app.use(((err, req, res, next) => {
  if (err.status && err.name) {
    return res.status(err.status).json({
      message: err.message,
      error: err.name,
    });
  }
  res.status(500).json({
    message: 'Internal server error',
    error: err.message,
  });
}) as ErrorRequestHandler);

export default app;
