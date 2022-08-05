import { Router } from 'express';

import authController from '../controllers/auth.controller.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';

const authRouter = Router();

authRouter.post('/signup', validateSchema, authController.signUp);
authRouter.post('/signin', validateSchema, authController.signIn);

export default authRouter;
