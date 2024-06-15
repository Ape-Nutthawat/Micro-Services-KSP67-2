import UpdateMemberService from './update_member.service.js';
import ErrorLogRepository from '../error-log.repository.js';

/**
 *
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */

export const checkMember = async (req, res, next) => {
  // console.log('checkMember : ', req.body);
  if (!req.body.CustomerID) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  const CustomerID = req.body.CustomerID;
  try {
    const result = await new UpdateMemberService().checkMember(CustomerID);
    if (result !== false) {
      const checkLog = await new UpdateMemberService().checkLog(CustomerID);
      if (checkLog !== false) {
        // console.log("Get Member Success");
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
        result: result,
        message: 'ผู้ตรวจสอบสิทธิโปรดทราบ <br> Attention',
        cause: 'เลขประจำตัวประชาชนของท่านมีการตรวจสอบสิทธิและแก้ไขข้อมูลแล้ว <br> (your ID card number has been edited)',
      });
    }
    res.status(200).send({
      status: 'success',
      code: 3,
      result: [],
      message: 'ผู้ตรวจสอบสิทธิโปรดทราบ <br> Attention',
      cause: `<b> ไม่พบข้อมูลของท่าน โปรดดำเนินการ ดังนี้ <br> (Can not found your information, please proceed as follows:) </b>
      <div style="text-align:left">
        <br> 1) กรณีเป็นผู้ไม่ผ่านเกณฑ์การทดสอบ ให้แจ้งผลการตรวจสอบสิทธิกับสำนักงานเลขาธิการคุรุสภา <a style="color:red">ผ่านระบบรับสมัครสอบ ในวันที่ 17 - 19 มิถุนายน 2567 </a> (In case of Candidates who have not passed the exam, please inform the result with The Secretariat Office of the Teachers' Council of Thailand)
        <br> 2) กรณีเป็นผู้สมัครเข้ารับการทดสอบครั้งแรก ให้แจ้งผลการตรวจสอบสิทธิกับสถาบันอุดมศึกษาของตนเอง (In case of Candidates who take the first exam , please inform to your institution)
      </div>
      <br><b> ทั้งนี้ ขอให้ท่านดำเนินการไม่เกินวันที่ 19 มิถุนายน 2567 (Please proceed within June 19, 2024.)</b>`,
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const updateMember = async (req, res, next) => {
  // console.log('updateMember : ', req.body);
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
    const oldData = await new UpdateMemberService().checkMember(body.CustomerID);
    if (oldData !== false) {
      await new UpdateMemberService().insertLogUpdateMember(body, oldData);
      await new UpdateMemberService().updateMember(body);
      // console.log('Update Member Success');
      return res.status(200).send({
        status: 'success',
        code: 1,
        message: '-',
        cause: '-',
      });
    }
    res.status(200).send({
      status: 'success',
      code: 3,
      result: [],
      message: 'ผู้ตรวจสอบสิทธิโปรดทราบ <br> Attention',
      cause: `<b> ไม่พบข้อมูลของท่าน โปรดดำเนินการ ดังนี้ <br> (Can not found your information, please proceed as follows:) </b>
      <div style="text-align:left">
        <br> 1) กรณีเป็นผู้ไม่ผ่านเกณฑ์การทดสอบ ให้แจ้งผลการตรวจสอบสิทธิกับสำนักงานเลขาธิการคุรุสภา <a style="color:red">ผ่านระบบรับสมัครสอบ ในวันที่ 17 - 19 มิถุนายน 2567 </a> (In case of Candidates who have not passed the exam, please inform the result with The Secretariat Office of the Teachers' Council of Thailand)
        <br> 2) กรณีเป็นผู้สมัครเข้ารับการทดสอบครั้งแรก ให้แจ้งผลการตรวจสอบสิทธิกับสถาบันอุดมศึกษาของตนเอง (In case of Candidates who take the first exam , please inform to your institution)
      </div>
      <br><b> ทั้งนี้ ขอให้ท่านดำเนินการไม่เกินวันที่ 19 มิถุนายน 2567 (Please proceed within June 19, 2024.)</b>`,
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    if (error.errno === 1062) {
      // console.log('CustomerID duplicate');
      res.status(400).send({
        status: 'error',
        code: 1062,
        result: {},
        message: 'ผู้ตรวจสอบสิทธิโปรดทราบ <br> Attention',
        cause: 'เลขประจำตัวประชาชนของท่านมีการตรวจสอบสิทธิและแก้ไขข้อมูลแล้ว <br> (your ID card number has been edited)',
      });
      return;
    }
    next(error);
  }
};