// auth.routes.js
import express from 'express';
const authRouter = express.Router();
import authController from '../controllers/authController';
import { validateCreateUser } from '../middleware/middleware';



authRouter.post('/login', authController.login);
authRouter.post('/signup', validateCreateUser, authController.createUser);
authRouter.get('/users', authController.getAllUsers);
authRouter.delete('/:userId', authController.deleteUser);
authRouter.put('/:userId', authController.updateUser);
authRouter.get('/:userId', authController.getUserById);





export default authRouter;
