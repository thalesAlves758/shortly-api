import { Router } from 'express';

import validateUser from '../middlewares/validateUser.middleware.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';
import urlController from '../controllers/url.controller.js';

const urlRouter = Router();

urlRouter.post(
  '/urls/shorten',
  validateUser,
  validateSchema,
  urlController.shortUrl
);

urlRouter.get('/urls/:id', urlController.getUrl);

export default urlRouter;
