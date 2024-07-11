import { pool } from '../database.js';
import { redis1 } from '../redis.js';

export default class SeatService {
  async updateSeatCustomer(RoundID, LocationID, CustomerID) {
    const updateQuery = `UPDATE customer SET
                                DateExp = DATE_ADD(NOW(), INTERVAL 1 DAY),
                                UpdateSeat = NOW(),
                                RoundID = ?,
                                LocationID = ?
                        WHERE CustomerID = ? 
                              AND RoundID IS NULL
                              AND LocationID IS NULL 
                              LIMIT 1`;

    const [result] = await pool.query(updateQuery, [RoundID, LocationID, CustomerID]);
    return result;
  }

  async getSeatCustomer() {
    const sql = `SELECT 
                  DateExp,
                  RoundID,
                  LocationID,
                  COUNT( ID ) AS seatCount 
                FROM
                  customer 
                WHERE
                  PayStatus = '*' 
                  AND DateExp = DATE (NOW()) 
                  AND RoundID IS NOT NULL 
                  AND LocationID IS NOT NULL
                GROUP BY RoundID, LocationID`;
    const [result] = await pool.query(sql);
    return result;
  }

  async updateSeatRedis(data) {
    const keyValuePairs = {};
    for (let i = 0; i < data.length; i++) {
      const keySeatCount = `SeatCount_R${data[i].RoundID}_L${data[i].LocationID}`;
      const seatCountRedis = await redis1.get(keySeatCount);
      const values = seatCountRedis - data[i].seatCount;
      keyValuePairs[keySeatCount] = values;
    }
    // console.log(keyValuePairs);
    const updateRedis = await redis1.mset(keyValuePairs);
    // console.log(updateRedis);
    return updateRedis;
  }

  async reloadSeatCustomer() {
    const updateSql = `UPDATE customer SET 
                        DateExp = NULL,
                        UpdateSeat = NULL,
                        RoundID = NULL,
                        LocationID = NULL 
                      WHERE DateExp = DATE(NOW())
                      AND PayStatus = "*"`;
    await pool.query(updateSql);
  }
}
