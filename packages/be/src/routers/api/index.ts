import express from 'express';
import { loading } from '@/utils/logs';
import authRoute from './auth.route';
import userRoute from './user.route';
import categoryRoute from './category.route';
import adminRoute from './admin.route';

const apiRouter = express.Router();
loading('API router');

apiRouter.use('/admin', adminRoute);
apiRouter.use('/auth', authRoute);
apiRouter.use('/user', userRoute);
apiRouter.use('/category', categoryRoute);

export default apiRouter;
