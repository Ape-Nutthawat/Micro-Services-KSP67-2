import SearchAppService from './search.service.js';
import ErrorLogRepository from '../error-log.repository.js';

export const searchB = async (req, res, next) => {
  // console.log('searchB : ', req.body);
  if (!req.body.CustomerID || !req.body.BirthDMY) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  const CustomerID = req.body.CustomerID;
  const BirthDMY = req.body.BirthDMY;
  try {
    const result = await new SearchAppService().getCustomerApp(CustomerID, BirthDMY);
    if (result) {
      // console.log("searchB success");
      res.status(200).send({
        status: 'success',
        code: 1,
        result: result,
        message: '-',
        cause: '-',
      });
      return;
    }

    return res.status(200).send({
      status: 'success',
      code: 0,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบไม่พบข้อมูลของท่าน <br> Can Not Found Your Information.',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const searchBirthday = async (req, res, next) => {
  // console.log('searchBirthday : ', req.body);
  if (!req.body.CustomerID || !req.body.TelMobile) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  const CustomerID = req.body.CustomerID;
  const TelMobile = req.body.TelMobile;
  try {
    const result = await new SearchAppService().getBirthday(CustomerID, TelMobile);
    if (result) {
      // console.log("search birthday success");
      res.status(200).send({
        status: 'success',
        code: 1,
        result: result,
        message: '-',
        cause: '-',
      });
      return;
    }

    return res.status(200).send({
      status: 'success',
      code: 0,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบไม่พบข้อมูลของท่าน <br> Can Not Found Your Information.',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};


