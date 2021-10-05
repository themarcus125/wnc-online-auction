import express from 'express';
import AuthController from '@/auth/auth.controller';
import { expiredTokenGuard } from '@/auth/auth.guard';
import { loginValidator, registerValidator } from '@/auth/auth.pipe';

export const authRoute = express.Router();

authRoute.post('/login', loginValidator, AuthController.login);
authRoute.post('/register', registerValidator, AuthController.register);
authRoute.get('/re-sign', expiredTokenGuard, AuthController.reSign);

export default authRoute;
