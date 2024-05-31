import { Router } from 'express';
import searchRouter from './search/search.routes.js';

const router = Router();

router.use('/search', searchRouter);

export default router;
