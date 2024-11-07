import { Router } from 'express';
import scoreRouter from './score/score.routes.js';

const router = Router();

router.use('/score', scoreRouter);

export default router;
