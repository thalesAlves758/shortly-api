import { Router } from 'express';

import authRouter from './routes/auth.routes.js';
import urlRouter from './routes/url.routes.js';

const router = Router();

router.use(authRouter);
router.use(urlRouter);

export default router;
