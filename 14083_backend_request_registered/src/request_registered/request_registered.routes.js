import { Router } from 'express';
import * as RequestRegisteredController from './request_registered.controller.js';
import { checkTimeOpen, checkTimeEnd } from './request_registered.middleware.js';
import { validateToken } from '../authtoken.js';

const router = Router();

// router.post('/login', validateToken, checkTimeOpen, checkTimeEnd, RequestController.login);
// router.post('/', validateToken, checkTimeOpen, checkTimeEnd, RequestController.request_registered);

router.post('/login', validateToken, RequestRegisteredController.login);
router.post('/', validateToken, RequestRegisteredController.requestRegistered);

export default router;
