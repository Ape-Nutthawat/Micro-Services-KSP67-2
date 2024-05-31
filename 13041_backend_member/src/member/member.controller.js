import MemberService from './member.service.js';
import ErrorLogRepository from '../error-log.repository.js';

/**
 *
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */

export const getMember = async (req, res, next) => {
  // console.log('getMember : ', req.body);
  if (!req.body.CustomerID) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง',
    });
  }
  const CustomerID = req.body.CustomerID;
  try {
    const result = await new MemberService().checkMember(CustomerID);
    if (result !== false) {
      const checkCus = await new MemberService().checkCustomer(CustomerID);
      // console.log(' 😎 ~ getMember ~ checkCus : ', checkCus);
      if (checkCus !== false) {
        // console.log("Get Member Success");
        return res.status(200).send({
          status: 'success',
          code: 1,
          result: result,
          message: '-',
          cause: '-',
        });
      }
      return res.status(400).send({
        status: 'failed',
        code: 0,
        result: {},
        message: 'ผู้สมัครโปรดทราบ',
        cause: 'เลขประจำตัวประชาชนของท่านถูกใช้ในการสมัครครั้งนี้แล้ว',
      });
    }
    res.status(200).send({
      status: 'success',
      code: 0,
      result: [],
      message: 'ผู้สมัครโปรดทราบ',
      cause: 'ไม่พบข้อมูลสมาชิกของท่าน',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    console.log(error);
    next(error);
  }
};
