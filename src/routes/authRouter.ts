// auth.routes.js
import express from 'express';
const authRouter = express.Router();
import authController from '../controllers/authController';
import { validateCreateUser } from '../middleware/middleware';
import  authenticateUser   from '../globalmiddleware/auth';



authRouter.post('/login', authController.login);
authRouter.post('/signup', validateCreateUser, authController.createUser);
authRouter.get('/users', authController.getAllUsers);


export default authRouter;
