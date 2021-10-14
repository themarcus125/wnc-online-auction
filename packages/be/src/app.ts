import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import router from './routers';
import { badRequestHandler, defaultErrorHandler } from './error';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(router);
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'NotFound',
    message: 'Not Found',
  });
});

app.use(badRequestHandler);
app.use(defaultErrorHandler);

export default app;
