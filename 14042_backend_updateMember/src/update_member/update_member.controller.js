import MemberService from './update_member.service.js';
import ErrorLogRepository from '../error-log.repository.js';

/**
 *
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */

export const checkMember = async (req, res, next) => {
  console.log('checkMember : ', req.body);
  if (!req.body.CustomerID) {
    console.log();
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
      console.log('Get Member Success');
      return res.status(200).send({
        status: 'success',
        code: 1,
        result: result,
        message: '-',
        cause: '-',
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
    next(error);
  }
};

export const updateMember = async (req, res, next) => {
  console.log('updateMember : ', req.body);
  if (!req.body.CustomerID) {
    console.log();
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง',
    });
  }
  const body = req.body;
  try {
    const oldData = await new MemberService().checkMember(body.CustomerID);
    if (oldData !== false) {
      const log = await new MemberService().insertLogUpdateMember(body, oldData);
      const update = await new MemberService().updateMember(body);
      console.log('Update Member Success');
      return res.status(200).send({
        status: 'success',
        code: 1,
        message: '-',
        cause: '-',
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
    if (error.errno === 1062) {
      console.log('CustomerID duplicate');
      res.status(400).send({
        status: 'error',
        code: 1062,
        result: {},
        message: 'ผู้สมัครโปรดทราบ',
        cause: 'เลขประจำตัวประชาชนของท่านมีการแก้ไขข้อมูลแล้ว',
      });
      return;
    }
    next(error);
  }
};

export const getMember = async (req, res, next) => {
  console.log('getMember : ', req.body);
  if (!req.body.CustomerID) {
    console.log();
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
        console.log('Get Member Success');
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
    next(error);
  }
};
