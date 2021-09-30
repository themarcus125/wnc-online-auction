import { appConfig } from '~/config';
import { serverStart } from '@/utils/logs';
import app from './app';
import { connectDB, seedDB } from './mongoose';

const bootstrap = async () => {
  await connectDB();
  await seedDB();
  const server = app.listen(appConfig.port, () =>
    serverStart(`http://${appConfig.host}:${appConfig.port}`),
  );
  return server;
};

bootstrap();
