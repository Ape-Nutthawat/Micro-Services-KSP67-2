import { pool } from '../database.js';

export default class SearchService {
  async getCustomerApp(CustomerID, BirthDMY) {
    const sqlSearchB = `SELECT * FROM vAppID WHERE CustomerID = ? AND BirthDMY = ? LIMIT 1`;
    const [result] = await pool.query(sqlSearchB, [CustomerID, BirthDMY]);
    if (result.length === 0) {
      return false;
    }
    await pool.query(`INSERT INTO app_log (CustomerID) VALUES ('${CustomerID}')`);
    return result[0];
  }

  async getBirthday(CustomerID, TelMobile) {
    const sqlSearchB = `SELECT BirthDMY FROM customer WHERE CustomerID = ? AND TelMobile = ? LIMIT 1`;
    const [result] = await pool.query(sqlSearchB, [CustomerID, TelMobile]);
    if (result.length === 0) {
      return false;
    }
    return result[0];
  }
}
