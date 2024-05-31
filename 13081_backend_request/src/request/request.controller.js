import RequestService from './request.service.js';
import ErrorLogRepository from '../error-log.repository.js';

/**
 *
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */

export const login = async (req, res, next) => {
  try {
      const { CustomerID } = req.body
      const result = await new  RequestService().getMemberByCustomerID(CustomerID)
      return res.status(200).send(result);
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
}

export const request = async (req, res, next) => {
  // console.log('createRequest : ', req.body.data.CustomerID);
  if (!req.body.data || !req.body.datafile) {
    // console.log("failed Invalid data format");
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง',
    });
  }
  const registerData = req.body.data;
  const registerFileData = req.body.datafile;
  try {
    const check = await new RequestService().getCheckAdd(req.body.data.CustomerID)
    if(check) {
      return res.status(200).send({
        status: "success",
        code: 0,
        result: {},
        message: 'ท่านมีสิทธิ์สมัครสอบแล้ว',
        cause: 'หากต้องการสมัครสอบ สามารถไปที่เมนู [สมัครสอบ]'
      });
    } 

    registerData.ip = req.ip;
    await new RequestService().addRequest(registerData, registerFileData);
    // console.log("insert request success");
    res.status(200).send({
      status: 'success',
      code: 1,
      result: {},
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    if (error.errno === 1062) {
      console.log("CustomerID duplicate");
      res.status(400).send({
        status: 'error',
        code: 1062,
        result: {},
        message: 'ผู้สมัครโปรดทราบ',
        cause: 'เลขประจำตัวประชาชนของท่านถูกใช้ในการยื่นคำร้องแล้ว',
      });
      return;
    }
    next(error);
  }
};