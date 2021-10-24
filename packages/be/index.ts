import { appConfig } from '~/config';
import { serverStart } from '@/utils/logs';
import app from '@/app';
import { connectDB } from '@/db/connect';
import { setupSchedule } from '@/schedule/schedule.service';

const bootstrap = async () => {
  await connectDB();
  await setupSchedule();
  const server = app.listen(appConfig.port, () =>
    serverStart(`http://${appConfig.host}:${appConfig.port}`),
  );
  return server;
};

bootstrap();
