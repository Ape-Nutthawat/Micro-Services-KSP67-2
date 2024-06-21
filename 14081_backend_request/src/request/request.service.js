import { pool } from '../database.js';

export default class RrequestService {
  async getCheckAdd(customerID) {
    const sql = `SELECT ID FROM member WHERE CustomerID = ?`;
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
    const sql = `SELECT * FROM member WHERE CustomerID = ?`;
    const [[member]] = await pool.query(sql, customerID);
    if (!member) {
      const sqlRequest = `SELECT * FROM request WHERE CustomerID = ?`;
      const [[request]] = await pool.query(sqlRequest, customerID);
      if (request) {
        res.result = request;
        res.code = 0;
        const statusApprove = request.StatusApprove;
        if (statusApprove === 1) {
          res.message = 'ผ่าน';
          res.causeEN = 'Pass';
          res.cause = 'ท่านสามารถยื่นคำร้องขอสิทธิในการสมัครสอบได้';
        } else {
          res.message = statusApprove === 2 ? 'รอตรวจสอบ' : statusApprove === 3 ? 'ท่านไม่มีสิทธิสมัครสอบ' : 'ไม่ผ่าน';
          res.cause = statusApprove === 2 ? '-' : 'เนื่องจาก ' + (!request.RemarkRequest || request.RemarkRequest === null || request.RemarkRequest === '' ? '-' : request.RemarkRequest);
          res.causeEN = statusApprove === 2 ? 'Waiting for validation' : 'Failed'
        }
        return res;
      }
      res.message = 'ท่านไม่มีสิทธิสมัครสอบ';
      res.cause = 'หากท่านต้องการสมัครสอบ สามารถยื่นคำร้องขอสิทธิสมัครสอบ';
      res.causeEN = '<b>You are not eligible to apply for the exam.</b><br>If you want to apply for the exam, please request the right for applying the exam.';

      return res;
    }
    res.result = member;
    res.code = 0;
    res.message = 'ท่านมีสิทธิสมัครสอบแล้ว';
    res.cause = 'หากต้องการสมัครสอบ สามารถไปที่เมนู [สมัครสอบ]';
    res.causeEN = '<b>You have the right to apply for the exam.</b><br>If you want to apply for the exam, go to menu “Apply for the exam”';
    return res;
  }

  async addRequest(requestData, requestFileData) {
    const sql = `INSERT INTO request SET 
                      CustomerID = ?, 
                      StudentID = ?,
                      Name1 = ?, 
                      Name2 = ?,
                      Name3 = ?, 
                      Name1EN = ?, 
                      Name2EN = ?, 
                      NameMidEN = ?, 
                      Name3EN = ?, 
                      University = ?, 
                      Degree = ?, 
                      Major = ?, 
                      StatusStudy = ?,
                      Address = ?, 
                      Soi = ?, 
                      Road = ?, 
                      District = ?, 
                      Amphur = ?, 
                      Province = ?, 
                      Zipcode = ?, 
                      Email = ?, 
                      TelMobile = ?,
                      FileCustomerID = ?, 
                      StatusApprove = ?, 
                      IP = ?`;

    await pool.query(sql, [
      requestData.CustomerID,
      requestData.StudentID,
      requestData.Name1,
      requestData.Name2,
      requestData.Name3,
      requestData.Name1EN,
      requestData.Name2EN,
      requestData.NameMidEN,
      requestData.Name3EN,
      requestData.University,
      requestData.Degree,
      requestData.Major,
      requestData.StatusStudy,
      requestData.Address,
      requestData.Soi,
      requestData.Road,
      requestData.District,
      requestData.Amphur,
      requestData.Province,
      requestData.Zipcode,
      requestData.Email,
      requestData.TelMobile,
      requestFileData.FileCustomerID,
      2,
      requestData.ip,
    ]);
  }
}
