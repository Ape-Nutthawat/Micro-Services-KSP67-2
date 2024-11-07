import { Router } from 'express';
import * as RequestScoreController from './requestScore.controller.js';
import { checkTimeOpen, checkTimeEnd } from './requestScore.middleware.js';
import { validateToken } from '../authtoken.js';

const router = Router();

router.post('/login', validateToken, RequestScoreController.login);
router.post('/', validateToken, checkTimeOpen, checkTimeEnd, RequestScoreController.requestScore);
// router.post('/', validateToken, RequestScoreController.requestScore);

export default router;
