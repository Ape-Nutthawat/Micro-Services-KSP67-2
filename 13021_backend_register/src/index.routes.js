import { Router } from 'express';
import registerRouter from './register/register.routes.js';

const router = Router();

router.use('/reg', registerRouter);

export default router;
