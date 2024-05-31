import { Router } from 'express';

import seatRouter from './seat/seat.routes.js';

const router = Router();

router.use('/seat', seatRouter);

export default router;
