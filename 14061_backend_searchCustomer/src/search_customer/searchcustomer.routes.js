import { Router } from 'express';
import * as SearchCustomerController from './searchcustomer.controller.js';
import { validateToken } from "../authtoken.js";

const router = Router();

router.post('/customer',validateToken , SearchCustomerController.searchCustomer);

export default router;
