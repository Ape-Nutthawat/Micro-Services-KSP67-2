import mariadb from 'mariadb';
import { pool } from '../database.js';

export default class MemberService {
  /**
   * @type { import('mariadb').Pool }
   */

  async checkMember(CustomerID) {
    const sqlCheckMember = `SELECT CustomerID, BirthDMY, Name1, Name2, Name3, Name1EN, Name2EN, NameMidEN, Name3EN, TelMobile, Email FROM member WHERE CustomerID = ? LIMIT 1`;
    const [member] = await pool.query(sqlCheckMember, CustomerID);
    if (member.length === 0) {
      return false;
    }
    return member;
  }

  async checkLog(CustomerID) {
    const sqlCheckLog = `SELECT ID FROM update_member_log WHERE CustomerID = ? LIMIT 1`;
    const [customer] = await pool.query(sqlCheckLog, CustomerID);
    if (customer.length === 0) {
      return true;
    }
    return false;
  }

  async insertLogUpdateMember(body, oldData) {
    const newData = {
      BirthDMY: oldData[0].BirthDMY === body.BirthDMY ? '-' : body.BirthDMY,
      Name1: oldData[0].Name1 === body.Name1 ? '-' : body.Name1,
      Name2: oldData[0].Name2 === body.Name2 ? '-' : body.Name2,
      Name3: oldData[0].Name3 === body.Name3 ? '-' : body.Name3,
      Name1EN: oldData[0].Name1EN === body.Name1EN ? '-' : body.Name1EN,
      Name2EN: oldData[0].Name2EN === body.Name2EN ? '-' : body.Name2EN,
      NameMidEN: oldData[0].NameMidEN === body.NameMidEN ? '-' : body.NameMidEN,
      Name3EN: oldData[0].Name3EN === body.Name3EN ? '-' : body.Name3EN,
      TelMobile: oldData[0].Name3EN === body.Name3EN ? '-' : body.Name3EN,
      Email: oldData[0].Name3EN === body.Name3EN ? '-' : body.Name3EN,
    };

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
      oldData[0].BirthDMY,
      newData.BirthDMY,
      oldData[0].Name1,
      newData.Name1,
      oldData[0].Name2,
      newData.Name2,
      oldData[0].Name3,
      newData.Name3,
      oldData[0].Name1EN,
      newData.Name1EN,
      oldData[0].Name2EN,
      newData.Name2EN,
      oldData[0].NameMidEN,
      newData.NameMidEN,
      oldData[0].Name3EN,
      newData.Name3EN,
      oldData[0].TelMobile,
      newData.TelMobile,
      oldData[0].Email,
      newData.Email,
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
}
