import { Router } from 'express';
import * as MemberController from './member.controller.js';
import { checkTimeOpen, checkTimeEnd } from './member.middleware.js';
import { validateToken } from '../authtoken.js';

const router = Router();

// router.post('/member', validateToken, checkTimeOpen, checkTimeEnd, MemberController.getMember);
router.post('/member', validateToken, MemberController.getMember);

export default router;
