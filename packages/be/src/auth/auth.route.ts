import express from 'express';
import AuthController from './auth.controller';
import { tokenGuard } from './auth.guard';
const authRoute = express.Router();

authRoute.post('/login', AuthController.login);
authRoute.post('/register', AuthController.register);
authRoute.get('/resign', tokenGuard, AuthController.resign);

export default authRoute;
