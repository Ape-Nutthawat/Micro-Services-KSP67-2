import { Router } from 'express';
import * as RegisterController from './register.controller.js';
import {checkTimeOpen, checkTimeEnd} from './register.middleware.js';
import { validateToken } from "../authtoken.js";

const router = Router();

// router.post('/customer', validateToken, checkTimeOpen, checkTimeEnd, RegisterController.createCustomer);
router.post('/customer', validateToken, RegisterController.createCustomer);

export default router;
