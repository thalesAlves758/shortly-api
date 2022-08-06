import { Router } from 'express';

import rankingController from '../controllers/ranking.controller.js';

const rankingRouter = Router();

rankingRouter.get('/ranking', rankingController.getRanking);

export default rankingRouter;
