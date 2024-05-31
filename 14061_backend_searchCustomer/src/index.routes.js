import { Router } from 'express';
import searchcustomerRouter from './search_customer/searchcustomer.routes.js';

const router = Router();

router.use('/status', searchcustomerRouter);

export default router;
