import { Router } from 'express';
import updateRouter from './update/update.routes.js';

const router = Router();

router.use('/update', updateRouter);

export default router;
