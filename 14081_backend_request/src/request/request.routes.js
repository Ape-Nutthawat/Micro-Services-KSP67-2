import { Router } from 'express';
import * as RequestController from './request.controller.js';
import { checkTimeOpen, checkTimeEnd } from './request.middleware.js';
import { validateToken } from '../authtoken.js';

const router = Router();

router.post('/login', validateToken, RequestController.login);
router.post('/', validateToken, checkTimeOpen, checkTimeEnd, RequestController.request);
// router.post('/', validateToken, RequestController.request);

export default router;
