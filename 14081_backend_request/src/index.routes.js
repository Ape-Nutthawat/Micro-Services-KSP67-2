import { Router } from 'express';
import requestRouter from './request/request.routes.js';

const router = Router();

router.use('/request', requestRouter);

export default router;
