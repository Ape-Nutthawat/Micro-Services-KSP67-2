import mariadb from 'mariadb';
import { pool } from '../database.js';

export default class RequestRegisteredService {
  async getCheckAdd(customerID) {
    const sql = `SELECT ID FROM member WHERE CustomerID = ? LIMIT 1`;
    const [[member]] = await pool.query(sql, customerID);
    return member;
  }

  async getMemberByCustomerID(customerID) {
    const res = {
      status: 'success',
      code: 1,
      result: {},
      message: '-',
      cause: '-',
      causeEN: '-',
    };
    const sql = `SELECT * FROM member WHERE CustomerID = ? LIMIT 1`;
    const [[member]] = await pool.query(sql, customerID);
    if (!member) {
      const sqlRequest = `SELECT * FROM request_registered WHERE CustomerID = ? LIMIT 1`;
      const [[request]] = await pool.query(sqlRequest, customerID);
      if (request) { // กรณีที่ยื่นขอตรวจไปแล้ว
        res.result = request;
        res.code = 0;
        const statusApprove = request.StatusApprove;
        if (statusApprove === 1) {
          res.message = 'ผ่าน';
          res.causeEN = 'Pass';
          res.cause = 'ท่านสามารถยื่นคำร้องขอทบทวนสิทธิได้';
        } else {
          res.message = statusApprove === 2 ? 'รอตรวจสอบ' : statusApprove === 3 ? 'ท่านไม่มีสิทธิสมัครสอบ' : 'ไม่ผ่าน';
          res.cause = statusApprove === 2 ? '-' : 'เนื่องจาก ' + (!request.RemarkRequest || request.RemarkRequest === null || request.RemarkRequest === '' ? '-' : request.RemarkRequest);
          res.causeEN = statusApprove === 2 ? 'Waiting for validation' : 'Failed'
        } 
        return res;
      }
      // กรณีไม่เคยยื่นขอตรวจ
      res.message = 'ท่านไม่มีสิทธิสมัครสอบ';
      res.cause = '- หากท่านเคยสมัครเข้ารับการทดสอบ ให้คลิกที่ปุ่ม “ขอทบทวนสิทธิ“ <br> - หากท่านสมัครสอบเป็นครั้งแรกให้ติดต่อกับสถาบันอุดมศึกษาของตนเอง';
      res.causeEN = '<b>You are not eligible to apply for the exam.</b><br>If you want to apply for the exam, please request the right for applying the exam.';

      return res;
    }
    // กรณีผ่าน
    res.result = member;
    res.code = 0;
    res.message = 'ท่านมีสิทธิสมัครสอบแล้ว';
    res.cause = '';
    res.causeEN = 'You have the right to apply for the exam.';
    return res;
  }

  async addRequestRegistered(body) {
    const sql = `INSERT INTO request_registered SET 
                      AppID = ?,
                      CustomerID = ?, 
                      StudentID = ?,
                      Name1 = ?, 
                      Name2 = ?,
                      Name3 = ?, 
                      Name1EN = ?, 
                      Name2EN = ?, 
                      NameMidEN = ?, 
                      Name3EN = ?, 
                      DateExam = ?,
                      Round = ?,
                      Location = ?,
                      University = ?, 
                      Degree = ?, 
                      Major = ?, 
                      StatusStudy = ?,
                      Email = ?, 
                      TelMobile = ?,
                      StatusApprove = ?, 
                      IP = ?`;

    await pool.query(sql, [
      body.AppID,
      body.CustomerID,
      body.StudentID,
      body.Name1,
      body.Name2,
      body.Name3,
      body.Name1EN,
      body.Name2EN,
      body.NameMidEN,
      body.Name3EN,
      body.DateExam,
      body.Round,
      body.Location,
      body.University,
      body.Degree,
      body.Major,
      body.StatusStudy,
      body.Email,
      body.TelMobile,
      2,
      body.IP,
    ]);
  }
}
