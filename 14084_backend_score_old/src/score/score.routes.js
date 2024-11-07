import { Router } from 'express';
import * as scoreController from './score.controller.js';
import checkTime from './score.middleware.js';
import { validateToken } from "../authtoken.js";

const router = Router();

router.post('/checkScore',validateToken, scoreController.checkScore);

export default router;