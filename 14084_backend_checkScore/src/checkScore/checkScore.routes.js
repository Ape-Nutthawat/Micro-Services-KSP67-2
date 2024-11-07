import { Router } from 'express';
import * as checkScoreController from './checkScore.controller.js';
import { validateToken } from '../authtoken.js';

const router = Router();

router.post('/checkScore', checkScoreController.checkScore);
router.post('/insertScore', checkScoreController.insertScore);

export default router;
