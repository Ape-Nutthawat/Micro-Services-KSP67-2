import { pool } from '../database.js';
import { redis15 } from '../redis.js';

export default class checkScoreService {
  
  async getScoreRedis(CustomerID, BirthDMY) {
    const replaceBirthDMY = BirthDMY.replaceAll('-', '');
    const score = await redis15.get(`${CustomerID}_${replaceBirthDMY}`);
    let result = JSON.parse(score);
    if (result.Status !== 1) {
      return false;
    }
    return result;
  }

  async getScoreFromDatabase(CustomerID, BirthDMY) {
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

  async getScore() {
    const sql = `SELECT  * FROM score`;
    const [result] = await pool.query(sql);
    return result;
  }

  async insertScore(rows) {
    try {
      const pipeline = redis15.multi();

      rows.forEach((row) => {
        const CustomerID = row.CustomerID;
        const BirthDMY = row.BirthDMY ? row.BirthDMY.replaceAll('-', '') : '';

        if (CustomerID && BirthDMY) {
          const key = `${CustomerID}_${BirthDMY}`;
          const value = JSON.stringify(row);
          console.log(' 😎 ~ checkScoreService ~ insertScore ~ key : ', key);
          pipeline.set(key, value);
        } else {
          console.warn(`ข้อมูลไม่สมบูรณ์สำหรับ row นี้: ${JSON.stringify(row)}`);
        }
      });

      await pipeline.exec();

      console.log('ข้อมูลทั้งหมดถูก insert ใน Redis สำเร็จในแบบ transaction');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการ insert ข้อมูลใน Redis:', error);
    }
  }
}
