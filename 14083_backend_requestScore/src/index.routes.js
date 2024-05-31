import { Router } from 'express';
import requestScoreRouter from './requestScore/requestScore.routes.js';

const router = Router();

router.use('/requestScore', requestScoreRouter);

export default router;
