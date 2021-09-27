import express from 'express';
import { loading } from '@/utils/logs';
import authRoute from '@/auth/auth.route';
import userRoute from '@/user/user.route';
import categoryRoute from '@/category/category.route';

const apiRouter = express.Router();
loading('API router');

apiRouter.use('/auth', authRoute);
apiRouter.use('/user', userRoute);
apiRouter.use('/category', categoryRoute);

export default apiRouter;
