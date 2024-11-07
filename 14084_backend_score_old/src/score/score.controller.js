import scoreService from './score.service.js';
/**
 *
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */

export const checkScore = async (req, res, next) => {
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

    const result = await new scoreService().checkScore(CustomerID, BirthDMY);
    if (result) {
      return res.status(200).send({
        status: 'success',
        code: 1,
        result: result,
        message: '-',
        cause: '-',
      });
    }
    return res.status(200).send({
      status: 'success',
      code: 0,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบไม่พบข้อมูลของท่าน <br> Can Not Found Your Information.',
    });
  } catch (error) {
    next(error);
  }
};
