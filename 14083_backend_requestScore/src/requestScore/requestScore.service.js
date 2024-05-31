import { pool } from '../database.js';

export default class RequestService {
  async countRequestScore(CustomerID, BirthDMY) {
    const sql = `SELECT COUNT(CustomerID) as CountRequestScore FROM request_score WHERE CustomerID = ? AND BirthDMY = ?`;
    const [[result]] = await pool.query(sql, [CustomerID, BirthDMY]);
    return result.CountRequestScore;
  }

  async getExaminees(customerID, BirthDMY) {
    const res = {
      status: 'success',
      code: 1,
      result: {},
      message: '-',
      cause: '',
      causeEN: '',
    };
    const sql = `SELECT * FROM vExaminee WHERE CustomerID = ? AND BirthDMY = ?`;
    const [[examinee]] = await pool.query(sql, [customerID, BirthDMY]);
    // console.log(examinee);
    if (examinee) {
      const sqlRequestScore = `SELECT * FROM request_score WHERE CustomerID = ? ORDER BY ID DESC LIMIT 1;`;
      const [[request_score]] = await pool.query(sqlRequestScore, customerID);
      // console.log(' 😎 ~ RequestService ~ getExaminees ~ request_score : ', request_score);
      if (request_score) {
        res.result = request_score;

        const statusApprove = request_score.StatusApprove;
        // const FileCustomerIDStatus = request_score.FileCustomerIDStatus;
        // const FileExamCardStatus = request_score.FileExamCardStatus;
        if (statusApprove === 1) {
          res.code = 0;
          res.message = 'ผ่าน';
          res.cause = 'ท่านสามารถยื่นขอรับบริการดูกระดาษคำตอบได้';
        } else if (statusApprove === 2) {
          res.code = 0;
          res.message = 'รอตรวจสอบ';
          res.cause = '';
          res.causeEN = 'Waiting for validation';
        } else {
          res.code = 1;
          res.message = 'ไม่ผ่าน';
          // res.cause = request_score.FileRequestScoreRemark ? 'สำเนาเอกสารหลักฐานการยื่นขอรับบริการดูกระดาษคำตอบ ไม่ผ่าน <br>'  + ` เนื่องจาก ${request_score.FileRequestScoreRemark}` : '';
          res.cause = 'เพราะ ไม่ดำเนินการตามข้อ 2.2 ของประกาศ เรื่อง การให้บริการดูกระดาษคำตอบฯ ประจำปี พ.ศ. 2566';
          res.causeEN = 'Failed';
        }
        return res;
      }
      res.result = examinee;
      res.message = 'ท่านสามารถยื่นขอรับบริการดูกระดาษคำตอบได้';
      res.cause = '-';
      res.causeEN = '<b>You have the right to request to see the answer document.';
      return res;
    }
    res.code = 0;
    res.message = 'ไม่พบข้อมูลการเข้ารับการทดสอบของท่าน';
    res.cause = '-';
    res.causeEN = '<b>No information was found for your test admission.';
    return res;
  }

  async checkRequestScore(CustomerID) {
    const sqlRequestScore = `SELECT StatusApprove FROM request_score WHERE CustomerID = ? ORDER BY ID DESC LIMIT 1`;
    const [request_score] = await pool.query(sqlRequestScore, CustomerID);
    return request_score
  }

  async addRequest(data, no, ip) {
    const sql = `INSERT INTO request_score SET 
                      AppID = ?, 
                      CustomerID = ?,
                      RoundID = ?,
                      Round = ?, 
                      LocationID = ?, 
                      Location = ?, 
                      Name1 = ?, 
                      Name2 = ?,
                      Name3 = ?, 
                      Name1EN = ?, 
                      Name2EN = ?, 
                      NameMidEN = ?, 
                      Name3EN = ?, 
                      BirthDMY = ?,
                      Nationality = ?, 
                      Degree = ?, 
                      Major = ?, 
                      University = ?, 
                      StatusStudy = ?,
                      TelMobile = ?,
                      Email = ?, 
                      TypeRegis = ?,
                      no = ?, 
                      StatusApprove = 2, 
                      IP = ?`;

    const [result] = await pool.query(sql, [
      data.AppID,
      data.CustomerID,
      data.RoundID,
      data.Round,
      data.LocationID,
      data.Location,
      data.Name1,
      data.Name2,
      data.Name3,
      data.Name1EN,
      data.Name2EN,
      data.NameMidEN,
      data.Name3EN,
      data.BirthDMY,
      data.Nationality,
      data.Degree,
      data.Major,
      data.University,
      data.StatusStudy,
      data.TelMobile,
      data.Email,
      data.TypeRegis,
      no,
      ip,
    ]);

    return result.insertId;
  }
}
