import { pool } from '../database.js';

export default class scoreService {

  async checkScore(CustomerID, BirthDMY) {
    const sql = `SELECT 
                  AppID,
                  CustomerID,
                  BirthDMY,
                  Name1,
                  Name2,
                  Name3,
                  Score,
                  ExamResult,
                  AnnouncementDate,
                  ValidUntilDate
                FROM score 
                WHERE CustomerID = ? AND BirthDMY = ? AND Status = ?`;
    const [result] = await pool.query(sql, [CustomerID, BirthDMY, 1]);
    if (result.length === 0) {
      return false;
    }
    return result[0];
  }
}
