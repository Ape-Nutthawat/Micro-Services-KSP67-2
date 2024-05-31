import { pool } from '../database.js';

export default class SearchService {
  async getNews() {
    const [news] = await pool.query("call getInfo();");
    return news;
  }

  async updateCountSeat(values, round, location) {

    const sql = `UPDATE location SET SeatCount = ? WHERE RoundID = ? AND LocationID = ? LIMIT 1`;
    const [result] = await pool.query(sql, [values, round, location]);

    return result;
  }
}
