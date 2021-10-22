import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import router from './routers';
import errorHandler, { defaultErrorHandler } from './error';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(router);
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'NotFoundRoute',
    message: 'Not Found Route',
  });
});

app.use(errorHandler, defaultErrorHandler);

export default app;
