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
      if (request) {
        res.result = request;
        res.code = 0;
        const statusApprove = request.StatusApprove;
        if (statusApprove === 1) {
          res.message = 'ผ่าน';
          res.cause = 'ท่านสามารถยื่นคำร้องขอตรวจสอบสิทธิ์ได้';
        } else {
          res.message = statusApprove === 2 ? 'รอตรวจสอบ' : statusApprove === 3 ? 'ท่านไม่มีสิทธิ์สมัครสอบ' : 'ไม่ผ่าน';
          res.cause = statusApprove === 2 ? '-' : 'เนื่องจาก ' + (!request.RemarkRequest || request.RemarkRequest === null || request.RemarkRequest === '' ? '-' : request.RemarkRequest);
          res.causeEN = statusApprove === 2 ? 'Waiting for validation' : 'Failed'
        } 
        return res;
      }
      res.message = 'ท่านไม่มีสิทธิ์สมัครสอบ';
      res.cause = 'หากท่านต้องการสมัครสอบ สามารถยื่นคำร้องขอตรวจสอบสิทธิ์';
      res.causeEN = '<b>You are not eligible to apply for the exam.</b><br>If you want to apply for the exam, please request the right for applying the exam.';

      return res;
    }
    res.result = member;
    res.code = 0;
    res.message = 'ท่านมีสิทธิ์สมัครสอบแล้ว';
    res.cause = 'หากต้องการสมัครสอบ สามารถไปที่เมนู [สมัครสอบ]';
    res.causeEN = '<b>You have the right to apply for the exam.</b><br>If you want to apply for the exam, go to menu “Apply for the exam”';
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
