import express from 'express';
import { loading } from '@/utils/logs';
import authRoute from '@/auth/auth.route';
import userRoute from '@/user/user.route';

const apiRouter = express.Router();
loading('API router');

apiRouter.use('/auth', authRoute);
apiRouter.use('/user', userRoute);

export default apiRouter;
