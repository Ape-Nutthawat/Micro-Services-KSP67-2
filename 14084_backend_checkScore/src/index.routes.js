import { Router } from 'express';

import checkScoreRouter from './checkScore/checkScore.routes.js';

const router = Router();

router.use('/score', checkScoreRouter);

export default router;
