import { pool } from '../database.js';

export default class CheckDuplicatePaymentServive {
  /**
   * @type { import('mariadb').Pool }
   */
  #db = pool;

  async checkDuplicatePayment(body) {
    const order_id = body.order_id;
    const order_description = body.order_description.split('_');
    const customer_id = order_description[2];

    const sql = `SELECT PayStatus FROM customer WHERE RefNo1 = ? AND CustomerID = ?`;
    const [response] = await this.#db.query(sql, [order_id, customer_id]);
    return response;
  }
}
