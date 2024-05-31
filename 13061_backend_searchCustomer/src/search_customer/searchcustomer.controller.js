import SearchCustomerService from './searchcustomer.service.js';
import ErrorLogRepository from '../error-log.repository.js';

export const searchCustomer = async (req, res, next) => {
  // console.log('status customer ', req.body);
  if (!req.body.CustomerID || !req.body.BirthDMY) {
    // console.log('failed Invalid data format');
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง',
    });
  }
  const CustomerID = req.body.CustomerID;
  const BirthDMY = req.body.BirthDMY;
  try {
    const result = await new SearchCustomerService().searchCustomer(CustomerID, BirthDMY);

    if (result) {
      // console.log('Search Customer Success');
      res.status(200).send({
        status: 'success',
        code: 1,
        result,
        message: '-',
        cause: '-',
      });
      return;
    }
    // console.log('data not found');
    return res.status(200).send({
      status: 'success',
      code: 0,
      result: {},
      message: 'ผู้สมัครโปรดทราบ',
      cause: 'ระบบไม่พบข้อมูลของท่าน กรุณาศึกษาประกาศสำนักงานฯ ข้อ 12.2 (1) <br><br> Please read the Notification of the Secretariat Office of the Teachers ‘Council of Thailand (KHURUSAPHA), clause 12.2 (1)',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};
