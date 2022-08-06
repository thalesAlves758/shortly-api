import { Router } from 'express';

import userController from '../controllers/user.controller.js';
import validateUser from '../middlewares/validateUser.middleware.js';

const userRouter = Router();

userRouter.get('/users/me', validateUser, userController.getUrls);

export default userRouter;
