import express from 'express';
import AuthController from './auth.controller';
import { expiredTokenGuard } from './auth.guard';
import { loginValidator, registerValidator } from './auth.pipe';
const authRoute = express.Router();

authRoute.post('/login', loginValidator, AuthController.login);
authRoute.post('/register', registerValidator, AuthController.register);
authRoute.get('/re-sign', expiredTokenGuard, AuthController.reSign);

export default authRoute;
