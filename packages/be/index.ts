import { appConfig } from '~/config';
import { serverStart } from '@/utils/logs';
import app from '@/app';
import { connectDB } from '@/db/connect';

const bootstrap = async () => {
  await connectDB();
  const server = app.listen(appConfig.port, () =>
    serverStart(`http://${appConfig.host}:${appConfig.port}`),
  );
  return server;
};

bootstrap();
