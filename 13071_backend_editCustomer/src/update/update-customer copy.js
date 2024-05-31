import { pool } from '../database.js';

export default class UpdateCustomer {
  /**
   * @type { import('mariadb').PoolConnection }
   */
  #transaction;

  #customerData;

  constructor(customerData) {
    this.#customerData = customerData;
  }

  async #insertLog() {
    const sql = `INSERT INTO update_customer_log SET 
    CustomerID = ?,
    OldData = (
      SELECT
      JSON_OBJECT(
        'CustomerID', CustomerID,
        'BirthDMY', BirthDMY,
        'Name1', Name1,
        'Name2', Name2,
        'Name3', Name3,
        'Name1EN', Name1EN,
        'Name2EN', Name2EN,
        'NameMidEN', NameMidEN,
        'Name3EN', Name3EN
        )
        FROM customer WHERE CustomerID = ? AND BirthDMY = ?
        ),
        FileImg = ?,
        FileCustomerID = ?,
        isFileImg = ?,
        NewData = ?`;
    const FileImg = `pic/FileImg.${this.#customerData.CustomerID}.jpeg`;
    const FileCustomerID = `edit/file-cusid/FileCustomerID.${this.#customerData.CustomerID}.pdf`;
    const [result] = await this.#transaction.query(sql, [
      this.#customerData.CustomerID,
      this.#customerData.CustomerID,
      this.#customerData.BirthDMY,
      FileImg,
      FileCustomerID,
      this.#customerData.isFileImg,
      this.#customerData,
    ]);
    return result.insertId;
  }

  async #updateData() {
    const updateQuery = `UPDATE customer SET
        Name1 = ?,
        Name2 = ?,
        Name3 = ?,
        Name1EN = ?,
        Name2EN = ?,
        NameMidEN = ?,
        Name3EN = ?
        WHERE CustomerID = ? AND BirthDMY = ? LIMIT 1`;

    await this.#transaction.query(updateQuery, [
      this.#customerData.Name1,
      this.#customerData.Name2,
      this.#customerData.Name3,
      this.#customerData.Name1EN,
      this.#customerData.Name2EN,
      this.#customerData.NameMidEN,
      this.#customerData.Name3EN,
      this.#customerData.CustomerID,
      this.#customerData.BirthDMY,
    ]);
  }

  async updateCustomerData() {
    try {
      this.#transaction = await pool.getConnection();
      await this.#transaction.beginTransaction();

      const insertId = await this.#insertLog();
      await this.#updateData();

      await this.#transaction.commit();
      await this.#transaction.release();
      return insertId;
    } catch (error) {
      await this.#transaction.rollback();
      await this.#transaction.release();
      throw error;
    }
  }

  async getCustomer(CustomerID, BirthDMY) {
    const sqlCustomer = `SELECT CustomerID, BirthDMY, Name1, Name2, Name3, Name1EN, Name2EN, NameMidEN, Name3EN, FileImg FROM customer WHERE CustomerID = ? AND BirthDMY = ?`;
    const [customerData] = await pool.query(sqlCustomer, [CustomerID, BirthDMY]);
    return customerData;
  }

  async checkLogUpdate(CustomerID) {
    const sqlCheckLog = `SELECT id FROM update_customer_log WHERE CustomerID = ?`;
    const [logData] = await pool.query(sqlCheckLog, [CustomerID]);
    return logData;
  }

  async getNationality(CustomerID, BirthDMY) {
    const sqlGetNationality = `SELECT CustomerID, BirthDMY, Name1, Name2, Name3, Name1EN, Name2EN, NameMidEN, Name3EN, NationalityID, Nationality FROM customer WHERE CustomerID = ? AND BirthDMY = ?`;
    const [customerData] = await pool.query(sqlGetNationality, [CustomerID, BirthDMY]);
    return customerData;
  }

  async checkLogUpdateNationality(CustomerID) {
    const sqlCheckLog = `SELECT id FROM update_nationality_log WHERE CustomerID = ?`;
    const [logData] = await pool.query(sqlCheckLog, [CustomerID]);
    return logData;
  }

  async insertNationality(customerData) {
    console.log(customerData)
    const sqlInsert = `INSERT INTO update_nationality_log SET 
    CustomerID = ?, 
    NationalityIDOld = ?, 
    NationalityOld = ?, 
    NationalityIDNew = ?, 
    NationalityNew = ?`;
    const result = await pool.query(sqlInsert, [customerData.CustomerID, customerData.NationalityIDOld, customerData.NationalityOld, customerData.NationalityIDNew, customerData.NationalityNew]);
    return result;
  }
}
