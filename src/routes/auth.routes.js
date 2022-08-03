import { Router } from 'express';

import authController from '../controllers/auth.controller.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';

const authRouter = Router();

authRouter.post('/sign-up', validateSchema, authController.signUp);

export default authRouter;
