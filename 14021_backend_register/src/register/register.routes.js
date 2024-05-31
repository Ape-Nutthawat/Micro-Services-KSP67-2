import { Router } from 'express';
import * as RegisterController from './register.controller.js';
import checkTime from './register.middleware.js';
import { validateToken } from "../authtoken.js";

const router = Router();

router.post('/customer', validateToken, checkTime, RegisterController.createCustomer);

export default router;
