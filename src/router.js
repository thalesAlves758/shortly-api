import { Router } from 'express';

import authRouter from './routes/auth.routes.js';
import urlRouter from './routes/url.routes.js';
import userRouter from './routes/user.routes.js';

const router = Router();

router.use(authRouter);
router.use(urlRouter);
router.use(userRouter);

export default router;
