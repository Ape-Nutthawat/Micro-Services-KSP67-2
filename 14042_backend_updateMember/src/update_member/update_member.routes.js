import { Router } from 'express';
import * as UpdateMemberController from './update_member.controller.js';
import { checkTimeOpen, checkTimeEnd} from './update_member.middleware.js';
import { validateToken } from "../authtoken.js";

const router = Router();

router.post('/login', validateToken, checkTimeOpen, UpdateMemberController.checkMember);
router.post('/', validateToken, checkTimeOpen, checkTimeEnd, UpdateMemberController.updateMember);

// router.post('/', validateToken, UpdateMemberController.updateMember);
// router.post('/login', validateToken, UpdateMemberController.checkMember);

export default router;
