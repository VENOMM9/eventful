// auth.routes.js
import express from 'express';
const authRouter = express.Router();
import authController from '../controllers/authController';

authRouter.post('/login', authController.login);
authRouter.post('/signup', authController.createUser);

export default  authRouter ;