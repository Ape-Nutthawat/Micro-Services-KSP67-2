import UpdateCustomer from './update-customer.js';
import ErrorLogRepository from '../error-log.repository.js';

export const updateCustomer = async (req, res, next) => {
  if (
    !req.body.CustomerID ||
    !req.body.BirthDMY ||
    !req.body.Name1 ||
    !req.body.Name2 ||
    !req.body.Name3 ||
    !req.body.Name1EN ||
    !req.body.Name2EN ||
    (!req.body.NameMidEN && req.body.NameMidEN !== '') ||
    !req.body.Name3EN ||
    !req.body.TelMobile ||
    !req.body.Email
  ) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  const customerData = req.body;

  // console.log(customerData);

  try {
    const result = await new UpdateCustomer(customerData).updateCustomerData();
    res.status(200).send({
      status: 'success',
      code: 1,
      result: { insertId: result },
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    if (error.errno === 1062) {
      // console.log('CustomerID duplicate');
      res.status(400).send({
        status: 'error',
        code: 1062,
        result: {},
        message: 'ผู้สมัครโปรดทราบ <br> Attention',
        cause: 'เลขประจำตัวประชาชนของท่านมีการแก้ไขข้อมูลแล้ว <br> Your ID Card Number Has Been Edited.',
      });
      return;
    }
    next(error);
  }
};

export const checkUpdate = async (req, res, next) => {
  // console.log('checkUpdate ', req.body);
  if (!req.body.CustomerID || !req.body.BirthDMY) {
    // console.log('failed Invalid data format');
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
    const result = await new UpdateCustomer().getCustomer(CustomerID, BirthDMY);
    if (result.length !== 0) {
      const checkLog = await new UpdateCustomer().checkLogUpdate(CustomerID);
      if (checkLog.length !== 0) {
        return res.status(200).send({
          status: 'success',
          code: 1,
          result: result[0],
          message: false,
          cause: '-',
        });
      }
      return res.status(200).send({
        status: 'success',
        code: 1,
        result: result[0],
        message: true,
        cause: '-',
      });
    }
    // console.log('data not found');
    return res.status(200).send({
      status: 'success',
      code: 0,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause:
        'ระบบไม่พบข้อมูลของท่าน กรุณาศึกษาประกาศสำนักงานฯ <br><br> Please read the Notification of the Secretariat Office of the Teachers ‘Council of Thailand (KHURUSAPHA)',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const checkNationality = async (req, res, next) => {
  // console.log('checkNationality ', req.body);
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
    const result = await new UpdateCustomer().getNationality(CustomerID, BirthDMY);
    if (result.length !== 0) {
      if (result[0].NationalityID == '4'){
        return res.status(200).send({
          status: 'success',
          code: 0,
          result: {},
          message: 'ผู้สมัครโปรดทราบ',
          cause: 'ท่านไม่มีสิทธิเปลี่ยนสัญชาติ',
        });
      }
      const checkLog = await new UpdateCustomer().checkLogUpdateNationality(CustomerID);
      if (checkLog.length !== 0) {
        return res.status(200).send({
          status: 'success',
          code: 0,
          result: {},
          message: "ผู้สมัครโปรดทราบ",
          cause: 'เลขประจำตัวประชาชนของท่านมีการแจ้งความประสงค์ขอเปลี่ยนสัญชาติแล้ว',
        });
      }
      return res.status(200).send({
        status: 'success',
        code: 1,
        result: result[0],
        message: true,
        cause: '-',
      });
    }
    // console.log('data not found');
    return res.status(200).send({
      status: 'success',
      code: 0,
      result: {},
      message: 'ผู้สมัครโปรดทราบ',
      cause:
        'ระบบไม่พบข้อมูลของท่าน กรุณาศึกษาประกาศสำนักงานฯ ข้อ 12.2 (1) <br><br> Please read the Notification of the Secretariat Office of the Teachers ‘Council of Thailand (KHURUSAPHA), clause 12.2 (1)',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const updateNationality = async (req, res, next) => {
  if (
    !req.body.CustomerID ||
    !req.body.NationalityIDOld ||
    !req.body.NationalityOld ||
    !req.body.NationalityIDNew ||
    !req.body.NationalityNew
  ) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง',
    });
  }
  const customerData = req.body;

  // console.log(customerData);

  if (customerData.NationalityIDNew == customerData.NationalityIDOld) {
    return res.status(200).send({
      status: 'success',
      code: 0,
      message: 'ผู้สมัครโปรดทราบ',
      cause: `ท่านไม่สามารถเปลี่ยนสัญชาติได้ เนื่องจากสัญชาติของท่านเป็น ${customerData.NationalityOld} อยู่แล้ว`,
    });
  }

  try {
    const result = await new UpdateCustomer().insertNationality(customerData);
    res.status(200).send({
      status: 'success',
      code: 1,
      result,
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    if (error.errno === 1062) {
      // console.log('CustomerID duplicate');
      res.status(400).send({
        status: 'error',
        code: 1062,
        result: {},
        message: 'ผู้สมัครโปรดทราบ',
        cause: 'เลขประจำตัวประชาชนของท่านมีการแจ้งความประสงค์ขอเปลี่ยนสัญชาติแล้ว',
      });
      return;
    }
    next(error);
  }
};
