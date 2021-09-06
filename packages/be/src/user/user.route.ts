import express from 'express';

import { userGuard } from '@/auth/auth.guard';
import UserController from './user.controller';

const userRoute = express.Router();

userRoute.get('/', userGuard, UserController.getUser);

export default userRoute;
