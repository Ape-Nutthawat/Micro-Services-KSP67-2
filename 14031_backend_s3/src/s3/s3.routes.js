import { Router } from 'express';
import * as S3Controller from './s3.controller.js';
import { validateToken } from '../authtoken.js';

const router = Router();

router.post('/base64', validateToken, S3Controller.getImgFileBase64);

router.post('/url', validateToken, S3Controller.getFiles);

router.post('/file/photo', validateToken, S3Controller.uploadImg);

router.post('/file/card_id', validateToken, S3Controller.uploadFileRequestCustomerID);

router.post('/file/update/photo', validateToken, S3Controller.uploadUpdateImg);

router.post('/file/update/card_id', validateToken, S3Controller.uploadFileUpdateCustomerID);

router.post('/file/bookbank', validateToken, S3Controller.uploadFileBookBank);

router.post('/file/update/bookbank', validateToken, S3Controller.uploadUpdateFileBookBank);

router.post('/file/request_score', validateToken, S3Controller.uploadFileRequestScore);

export default router;