import { Router } from 'express';
import * as MemberController from './update_member.controller.js';
import { checkTimeOpen, checkTimeEnd} from './update_member.middleware.js';
import { validateToken } from "../authtoken.js";

const router = Router();

// router.post('/member', validateToken, checkTimeOpen, checkTimeEnd, MemberController.updateMember);
router.post('/', validateToken, MemberController.updateMember);

export default router;
