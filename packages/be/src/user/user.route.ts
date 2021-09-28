import express from 'express';

import { tokenGuard } from '@/auth/auth.guard';
import UserController from './user.controller';

const userRoute = express.Router();

userRoute.get('/', tokenGuard, UserController.getUser);
userRoute.patch('/', tokenGuard, UserController.updateUser);
userRoute.post('/email', tokenGuard, UserController.checkUserEmail);
userRoute.patch('/email', tokenGuard, UserController.changeUserEmail);

export default userRoute;
