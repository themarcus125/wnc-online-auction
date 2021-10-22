import express from 'express';
import AuthController from '@/auth/auth.controller';
import { tokenGuard } from '@/auth/auth.guard';
import { loginValidator, registerValidator } from '@/auth/auth.pipe';

const authRoute = express.Router();

authRoute.post('/login', loginValidator, AuthController.login);
authRoute.post('/register', registerValidator, AuthController.register);
authRoute.get('/re-sign', tokenGuard(true), AuthController.reSign);

export default authRoute;
