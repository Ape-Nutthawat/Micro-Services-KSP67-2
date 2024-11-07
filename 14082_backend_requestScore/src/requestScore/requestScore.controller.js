import RequestScoreService from './requestScore.service.js';
/**
 *
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */

export const login = async (req, res, next) => {
  try {
    if (!req.body.CustomerID || !req.body.BirthDMY) {
      return res.status(400).send({
        status: 'failed',
        code: 0,
        message: 'เกิดข้อผิดพลาด',
        cause: 'รูปแบบข้อมูลไม่ถูกต้อง',
      });
    }
    const CustomerID = req.body.CustomerID;
    const BirthDMY = req.body.BirthDMY;

      const result = await new RequestScoreService().getExaminees(CustomerID, BirthDMY)
      return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

export const requestScore = async (req, res, next) => {
  // console.log('createRequest : ', req.body);
  const data = req.body;
  const CustomerID = req.body.CustomerID;
  const BirthDMY = req.body.BirthDMY;
  const ip = req.ip;
  try {
    const countRequestScore = await new RequestScoreService().countRequestScore(CustomerID, BirthDMY)
    const no = countRequestScore + 1 
    const checkRequestScore = await new RequestScoreService().checkRequestScore(CustomerID);
    if (checkRequestScore.length > 0) {
      if (checkRequestScore[0].StatusApprove === 2) {
        return res.status(200).send({
          status: 'success',
          code: 0,
          result: {},
          message: 'รอตรวจสอบ',
          cause: '',
          causeEN: 'Waiting for validation',
        });
      }
    }
    const result = await new RequestScoreService().addRequest(data, no, ip);
    res.status(200).send({
      status: 'success',
      code: 1,
      result: { insertId: result },
      message: '-',
      cause: '-',
    });
  } catch (error) {
    if (error.errno === 1062) {
      console.log("CustomerID duplicate");
      res.status(400).send({
        status: 'error',
        code: 1062,
        result: {},
        message: 'ผู้สมัครโปรดทราบ <br> Attention',
        cause: 'เลขประจำตัวประชาชนของท่านถูกใช้แล้ว <br> Your ID Card Number Has Already Been Used.',
      });
      return;
    }
    next(error);
  }
};