import S3Service from './s3.service.js';
import ErrorLogRepository from '../error-log.repository.js';
import { v4 as uuidv4 } from 'uuid';

export const uploadImg = async (req, res, next) => {
  if (!req.body.CustomerID || !req.files) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  let FileImg = req.files.file;
  let CustomerID = req.body.CustomerID

  try {
    const result = await new S3Service().uploadImg(FileImg, CustomerID);

    res.status(200).send({
      status: 'success',
      result,
      code: 1,
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const uploadFileRequestCustomerID = async (req, res, next) => {
  if (!req.body.CustomerID || !req.files) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  let FileCustomerID = req.files.file;
  let CustomerID = req.body.CustomerID

  try {
    const result = await new S3Service().uploadFileRequestCustomerID(FileCustomerID, CustomerID);

    res.status(200).send({
      status: 'success',
      result,
      code: 1,
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const getImgFileBase64 = async (req, res, next) => {
  const { fileName } = req.body;

  try {
    const file = await new S3Service().getImgFileBase64(fileName);
    res.status(200).send({
      status: 'success',
      code: 1,
      result: {
        file,
      },
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const getFiles = async (req, res, next) => {
  const { fileName } = req.body ;
  try {
    const url = await new S3Service().getFiles(fileName);
    res.status(200).send({
      status: 'success',
      code: 1,
      result: {
        url,
      },
      message: '-',
      cause: '-',
    });
  } catch (error) {
    next(error);
  }
};

export const uploadUpdateImg = async (req, res, next) => {
  if (!req.body.CustomerID || !req.files || !req.body.LogID) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  let FileImg = req.files.file;
  let CustomerID = req.body.CustomerID
  let LogID = req.body.LogID

  try {
    const s3Service = new S3Service();
    const backUpFileName = await s3Service.moveFile(FileImg, CustomerID, LogID);
    const result = await s3Service.uploadUpdateImg(FileImg, CustomerID);
    await s3Service.uploadLog(backUpFileName, LogID);
    res.status(200).send({
      status: 'success',
      result,
      code: 1,
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const uploadFileUpdateCustomerID = async (req, res, next) => {
  if (!req.body.CustomerID || !req.files) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  let FileCustomerID = req.files.file;
  let CustomerID = req.body.CustomerID

  try {
    const result = await new S3Service().uploadFileUpdateCustomerID(FileCustomerID, CustomerID);

    res.status(200).send({
      status: 'success',
      result,
      code: 1,
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const uploadFileBookBank = async (req, res, next) => {
  if (!req.body.CustomerID || !req.files) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  let FileCustomerID = req.files.file;
  let CustomerID = req.body.CustomerID

  try {
    const result = await new S3Service().uploadFileBookBank(FileCustomerID, CustomerID);

    res.status(200).send({
      status: 'success',
      result,
      code: 1,
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const uploadUpdateFileBookBank = async (req, res, next) => {
  if (!req.body.CustomerID || !req.files || !req.body.LogID) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  const FileBookBank = req.files.file;
  const CustomerID = req.body.CustomerID
  const LogID = req.body.LogID

  try {
    const s3Service = new S3Service();
    const backUpFileName = await s3Service.moveFileBookBank(FileBookBank, CustomerID, LogID);
    const result = await s3Service.UpdateFileBookBank(FileBookBank, CustomerID);
    await s3Service.insertLogFileBookBank(backUpFileName, LogID);
    
    res.status(200).send({
      status: 'success',
      result,
      code: 1,
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const uploadFileRequestScore = async (req, res, next) => {
  if (!req.body.CustomerID || !req.files) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  const FileCustomerID = req.files.file;
  const CustomerID = req.body.CustomerID;

  try {
    const fullUuid = uuidv4();

    const shortUuid = fullUuid.slice(0, 6).replace(/[^a-zA-Z0-9]/g, '');
    // const shortUuid = fullUuid.slice(0, 6);

    const result = await new S3Service().uploadFileRequestScore(FileCustomerID, CustomerID, shortUuid);
    res.status(200).send({
      status: 'success',
      result,
      code: 1,
      message: '-',
      cause: '-',
    });
  } catch (error) {
    next(error);
  }
};