import express from 'express';
import AuthController from './auth.controller';
import { expiredTokenGuard, tokenGuard } from './auth.guard';
const authRoute = express.Router();

authRoute.post('/login', AuthController.login);
authRoute.post('/register', AuthController.register);
authRoute.get('/re-sign', expiredTokenGuard, AuthController.reSign);

export default authRoute;
