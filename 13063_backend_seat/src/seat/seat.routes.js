import { Router } from 'express';
import * as SeatController from './seat.controller.js';
import { validateToken } from '../authtoken.js';

const router = Router();

router.post('/checkSeat', validateToken, SeatController.checkSeat);

router.get('/reloadSeat', validateToken, SeatController.reloadSeat);

export default router;
