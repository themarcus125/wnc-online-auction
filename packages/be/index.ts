import { createServer } from 'http';
import app from '@/app';
import initSocketIO from '@/web-socket';
import { setupSchedule } from '@/schedule/schedule.service';
import { appConfig } from '~/config';
import { serverStart } from '@/utils/logs';
import { connectDB } from '@/db/connect';

const bootstrap = async () => {
  await connectDB();
  await setupSchedule();
  const server = app.listen(appConfig.port, () =>
    serverStart(`http://${appConfig.host}:${appConfig.port}`),
  );
  // initSocketIO(server);
  return server;
};

const bootstrapWithSocket = async () => {
  await connectDB();
  await setupSchedule();
  const server = createServer(app);
  initSocketIO(server);
  server.listen(appConfig.port, () => {
    serverStart(`http://${appConfig.host}:${appConfig.port}`);
  });
  return server;
};

bootstrap();
