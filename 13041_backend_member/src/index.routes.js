import { Router } from 'express';
import memberRouter from './member/member.routes.js';

const router = Router();

router.use('/reg2', memberRouter);

export default router;
