import { Router } from 'express';
import updateMemberRouter from './update_member/update_member.routes.js';

const router = Router();

router.use('/updateMember', updateMemberRouter);

export default router;
