import RequestRegisteredService from './request_registered.service.js';
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
      const result = await new  RequestRegisteredService().getMemberByCustomerID(CustomerID)
      return res.status(200).send(result);
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
}

export const requestRegistered = async (req, res, next) => {
  if (!req.body.CustomerID) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  const body = req.body;
  try {
    const check = await new RequestRegisteredService().getCheckAdd(body.CustomerID)
    if(check) {
      return res.status(200).send({
        status: "success",
        code: 0,
        result: {},
        message: 'ท่านมีสิทธิ์สมัครสอบแล้ว <br> You Have The Right To Apply For The Exam.',
        cause: 'หากต้องการสมัครสอบ สามารถไปที่เมนู [สมัครสอบ] <br><b>You have the right to apply for the exam.</b><br>If you want to apply for the exam, go to menu “Apply for the exam”'
      });
    } 

    await new RequestRegisteredService().addRequestRegistered(body);
    console.log("insert request registered success");
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
      // console.log("CustomerID duplicate");
      res.status(400).send({
        status: 'error',
        code: 1062,
        result: {},
        message: 'ผู้สมัครโปรดทราบ <br> Attention',
        cause: 'เลขประจำตัวประชาชนของท่านถูกใช้ในการยื่นคำร้องแล้ว <br> Your ID Card Number Has Been Used To Submit Your Request.',
      });
      return;
    }
    next(error);
  }
};