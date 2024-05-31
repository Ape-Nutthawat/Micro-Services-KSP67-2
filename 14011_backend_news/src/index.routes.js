import { Router } from 'express';
import newRouter from './news/news.routes.js';

const router = Router();

router.use('/home', newRouter);

export default router;
