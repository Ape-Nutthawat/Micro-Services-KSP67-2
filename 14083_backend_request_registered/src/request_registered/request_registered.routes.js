import { Router } from 'express';
import * as RequestRegisteredController from './request_registered.controller.js';
import { checkTimeOpen, checkTimeEnd } from './request_registered.middleware.js';
import { validateToken } from '../authtoken.js';

const router = Router();

router.post('/login', validateToken, checkTimeOpen, RequestRegisteredController.login);
router.post('/', validateToken, checkTimeOpen, checkTimeEnd, RequestRegisteredController.requestRegistered);

export default router;
