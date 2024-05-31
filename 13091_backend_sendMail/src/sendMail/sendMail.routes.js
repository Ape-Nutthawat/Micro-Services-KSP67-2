import { Router } from 'express';
import * as RequestController from './sendMail.controller.js';
import { validateToken } from '../authtoken.js';

const router = Router();

router.post('/', validateToken, RequestController.sendMail);
router.post('/payment', validateToken, RequestController.sendMailPayment)
router.post('/refund', validateToken, RequestController.sendMailRefund)


export default router;
