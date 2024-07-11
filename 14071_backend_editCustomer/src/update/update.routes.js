import { Router } from 'express';
import * as UpdateController from './update.controller.js';
import { checkTimeOpen, checkTimeEnd } from './update.middleware.js';
import { validateToken } from '../authtoken.js';

const router = Router();

router.put('/customer', validateToken, checkTimeOpen, checkTimeEnd, UpdateController.updateCustomer);

router.post('/login', validateToken, checkTimeOpen, checkTimeEnd, UpdateController.checkUpdate);

// router.post('/nationality/login', validateToken ,checkTimeOpen, checkTimeEnd, UpdateController.checkNationality);

// router.post('/nationality', validateToken ,checkTimeOpen, checkTimeEnd, UpdateController.updateNationality);

// router.put('/customer', validateToken, UpdateController.updateCustomer);

// router.post('/login', validateToken, UpdateController.checkUpdate);

// router.post('/nationality/login', validateToken, UpdateController.checkNationality);

// router.post('/nationality', validateToken, UpdateController.updateNationality);

export default router;
