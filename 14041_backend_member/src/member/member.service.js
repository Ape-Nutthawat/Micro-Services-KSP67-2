import { pool } from '../database.js';

export default class MemberService {
  /**
   * @type { import('mariadb').Pool }
   */

  async checkMember(CustomerID) {
    const sqlCheckMember = `SELECT * FROM member WHERE CustomerID = ?`;
    const [member] = await pool.query(sqlCheckMember, CustomerID);
    if (member.length === 0) {
      return false;
    }
    return member;
  }

  async checkCustomer(CustomerID) {
    const sqlCheckCustomer = `SELECT ID FROM customer WHERE CustomerID = ?`;
    const [customer] = await pool.query(sqlCheckCustomer, CustomerID);
    if (customer.length === 0) {
      return true;
    }
    return false;
  }
}
