import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middlewares.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.get('/', userController.findAll);
userRouter.get('findById/:id?', validId, validUser, authMiddleware, userController.findById);
userRouter.patch('/:id', validId, validUser, authMiddleware, userController.update);


export default userRouter;