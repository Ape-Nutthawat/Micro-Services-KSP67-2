import { Router } from 'express';
import sendMailRouter from './sendMail/sendMail.routes.js';

const router = Router();

router.use('/sendMail', sendMailRouter);

export default router;
