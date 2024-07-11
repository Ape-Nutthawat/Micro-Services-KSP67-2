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
    const sqlSelect = `SELECT CustomerID, BirthDMY, Name1, Name2, Name3, Name1EN, Name2EN, NameMidEN, Name3EN, TelMobile, Email FROM customer WHERE CustomerID = ?`;
    const [[oldDataCustomer]] = await this.#transaction.query(sqlSelect, [this.#customerData.CustomerID]);

    const newDataDefaults = {
      BirthDMY: oldDataCustomer.BirthDMY === this.#customerData.BirthDMY ? '-' : this.#customerData.BirthDMY,
      Name1: oldDataCustomer.Name1 === this.#customerData.Name1 ? '-' : this.#customerData.Name1,
      Name2: oldDataCustomer.Name2 === this.#customerData.Name2 ? '-' : this.#customerData.Name2,
      Name3: oldDataCustomer.Name3 === this.#customerData.Name3 ? '-' : this.#customerData.Name3,
      Name1EN: oldDataCustomer.Name1EN === this.#customerData.Name1EN ? '-' : this.#customerData.Name1EN,
      Name2EN: oldDataCustomer.Name2EN === this.#customerData.Name2EN ? '-' : this.#customerData.Name2EN,
      NameMidEN: oldDataCustomer.NameMidEN === this.#customerData.NameMidEN ? '-' : this.#customerData.NameMidEN,
      Name3EN: oldDataCustomer.Name3EN === this.#customerData.Name3EN ? '-' : this.#customerData.Name3EN,
      TelMobile: oldDataCustomer.TelMobile === this.#customerData.TelMobile.replaceAll("-", "") ? '-' : this.#customerData.TelMobile.replaceAll("-", ""),
      Email: oldDataCustomer.Email === this.#customerData.Email ? '-' : this.#customerData.Email,
    };

    const newData = { ...oldDataCustomer, ...newDataDefaults };

    const sql = `INSERT INTO update_customer_log SET 
        CustomerID = ?,
        BirthDMYOld = ?,
        BirthDMYNew = ?,
        Name1Old = ?,
        Name1New = ?,
        Name2Old = ?,
        Name2New = ?,
        Name3Old = ?,
        Name3New = ?,
        Name1ENOld = ?,
        Name1ENNew = ?,
        Name2ENOld = ?,
        Name2ENNew = ?,
        NameMidENOld = ?,
        NameMidENNew = ?,
        Name3ENOld = ?,
        Name3ENNew = ?,
        TelMobileOld = ?,
        TelMobileNew = ?,
        EmailOld = ?,
        EmailNew = ?,
        isFileImg = ?,
        FileImg = ?,
        FileCustomerID = ?`;

    const FileImg = `pic/FileImg.${this.#customerData.CustomerID}.jpeg`;
    const FileCustomerID = `edit/file-cusid/FileCustomerID.${this.#customerData.CustomerID}.pdf`;

    const [result] = await this.#transaction.query(sql, [
      this.#customerData.CustomerID,
      oldDataCustomer.BirthDMY,
      newData.BirthDMY,
      oldDataCustomer.Name1,
      newData.Name1,
      oldDataCustomer.Name2,
      newData.Name2,
      oldDataCustomer.Name3,
      newData.Name3,
      oldDataCustomer.Name1EN,
      newData.Name1EN,
      oldDataCustomer.Name2EN,
      newData.Name2EN,
      oldDataCustomer.NameMidEN,
      newData.NameMidEN,
      oldDataCustomer.Name3EN,
      newData.Name3EN,
      oldDataCustomer.TelMobile,
      newData.TelMobile,
      oldDataCustomer.Email,
      newData.Email,
      this.#customerData.isFileImg,
      FileImg,
      FileCustomerID,
    ]);

    return result.insertId;
  }

  async #updateData() {
    const updateQuery = `UPDATE customer SET
        BirthDMY = ?,
        Name1 = ?,
        Name2 = ?,
        Name3 = ?,
        Name1EN = ?,
        Name2EN = ?,
        NameMidEN = ?,
        Name3EN = ?,
        TelMobile = ?,
        Email= ?
        WHERE CustomerID = ? LIMIT 1`;

    await this.#transaction.query(updateQuery, [
      this.#customerData.BirthDMY,
      this.#customerData.Name1,
      this.#customerData.Name2,
      this.#customerData.Name3,
      this.#customerData.Name1EN,
      this.#customerData.Name2EN,
      this.#customerData.NameMidEN,
      this.#customerData.Name3EN,
      this.#customerData.TelMobile.replaceAll("-", ""),
      this.#customerData.Email,
      this.#customerData.CustomerID,
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
    const sqlCustomer = `SELECT CustomerID, BirthDMY, Name1, Name2, Name3, Name1EN, Name2EN, NameMidEN, Name3EN, TelMobile, Email, FileImg FROM customer WHERE CustomerID = ? AND BirthDMY = ?`;
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
    console.log(customerData);
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
