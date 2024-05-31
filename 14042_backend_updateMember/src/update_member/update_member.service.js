import mariadb from 'mariadb';
import { pool } from '../database.js';

export default class MemberService {
  /**
   * @type { import('mariadb').Pool }
   */

  async checkMember(CustomerID) {
    const sqlCheckMember = `SELECT CustomerID, BirthDMY, Name1, Name2, Name3, Name1EN, Name2EN, NameMidEN, Name3EN, TelMobile, Email FROM member WHERE CustomerID = ? LIMIT 1`;
    const [[member]] = await pool.query(sqlCheckMember, CustomerID);
    if (member.length === 0) {
      return false;
    }
    return member;
  }

  async insertLogUpdateMember(body, oldData) {
    const sqlInsertLogUpdateMember = `INSERT INTO update_member_log SET 
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
    EmailNew = ?`;
    const [updateMember] = await pool.query(sqlInsertLogUpdateMember, [
      body.CustomerID,
      oldData.BirthDMY,
      body.BirthDMY,
      oldData.Name1,
      body.Name1,
      oldData.Name2,
      body.Name2,
      oldData.Name3,
      body.Name3,
      oldData.Name1EN,
      body.Name1EN,
      oldData.Name2EN,
      body.Name2EN,
      oldData.NameMidEN,
      body.NameMidEN,
      oldData.Name3EN,
      body.Name3EN,
      oldData.TelMobile,
      body.TelMobile,
      oldData.Email,
      body.Email,
    ]);
    return updateMember;
  }

  async updateMember(body) {
    const sqlUpdate = `UPDATE member SET
                          Name1 = ?,
                          Name2 = ?,
                          Name3 = ?,
                          Name1EN = ?,
                          Name2EN = ?,
                          NameMidEN = ?,
                          Name3EN = ?,
                          BirthDMY = ?,
                          TelMobile = ?,
                          Email = ?
                        WHERE CustomerID = ? LIMIT 1`;

    const [result] = await pool.query(sqlUpdate, [
      body.Name1,
      body.Name2,
      body.Name3,
      body.Name1EN,
      body.Name2EN,
      body.NameMidEN,
      body.Name3EN,
      body.BirthDMY,
      body.TelMobile,
      body.Email,
      body.CustomerID
    ]);
    return result
  }

  async checkCustomer(CustomerID) {
    const sqlCheckCustomer = `SELECT ID FROM customer WHERE CustomerID = ? LIMIT 1`;
    const [customer] = await pool.query(sqlCheckCustomer, CustomerID);
    if (customer.length === 0) {
      return true;
    }
    return false;
  }
}
