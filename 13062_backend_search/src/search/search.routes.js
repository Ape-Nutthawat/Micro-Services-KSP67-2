import { Router } from 'express';
import * as SearchController from './search.controller.js';
import { validateToken } from "../authtoken.js";

const router = Router();

router.post('/b',validateToken , SearchController.searchB);

router.post('/birthday',validateToken , SearchController.searchBirthday);

export default router;
