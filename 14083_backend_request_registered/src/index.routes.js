import { Router } from 'express';
import requestRegisteredRouter from './request_registered/request_registered.routes.js';

const router = Router();

router.use('/requestRegistered', requestRegisteredRouter);

export default router;
