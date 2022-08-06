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
urlRouter.get('/urls/open/:shortUrl', urlController.openUrl);
urlRouter.delete('/urls/:id', validateUser, urlController.deleteUrl);

export default urlRouter;
