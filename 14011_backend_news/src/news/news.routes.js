import { Router } from 'express';
import * as NewsController from './news.controller.js';
import { validateToken } from "../authtoken.js";

const router = Router();

router.get('/news', NewsController.getAllNews);
// router.get('/updateLocations', NewsController.updateLocations)

export default router;
