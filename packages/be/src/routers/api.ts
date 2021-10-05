import express from 'express';
import { loading } from '@/utils/logs';

import authRoute from '@/auth/auth.route';
import userRoute from '@/user/route/user.route';
import categoryRoute from '@/category/category.route';
import adminRoute from '@/admin/route/admin.route';
import productRoute from '@/product/product.route';

const apiRouter = express.Router();
loading('API router');

apiRouter.use('/admin', adminRoute);
apiRouter.use('/auth', authRoute);
apiRouter.use('/user', userRoute);
apiRouter.use('/product', productRoute);
apiRouter.use('/category', categoryRoute);

export default apiRouter;
