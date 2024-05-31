import pool from '../database.js';
import ErrorLogRepository from '../error-log.repository.js';

export default class PaymentService {
  #transaction;

  #registerRef;

  #tdcpResponse;

  #roundId;

  #locationId;

  #customerId;

  /**
   *
   * @param { Object } tdcpResponse
   * @param { string } ref
   * @param { string} orderDesc
   */
  constructor(tdcpResponse, ref, orderDesc) {
    this.#tdcpResponse = tdcpResponse;
    const order_description = orderDesc.split('_');
    const roundId = order_description[0];
    const locationId = order_description[1];
    const customerId = order_description[2];
    this.#roundId = roundId;
    this.#locationId = locationId;
    this.#customerId = customerId;
    this.#registerRef = ref;
  }

  async #insertLog() {
    const sql = `INSERT INTO transaction_log SET
                 event = ?,
                 merchant_id = ?,
                 timestamp = ?,
                 detail__receipt__transactionCode = ?,
                 detail__receipt__status = ?,
                 detail__receipt__xmlURL = ?,
                 detail__receipt__pdfURL = ?,     
                 detail__response_code = ?,  
                 detail__response_message = ?,
                 detail__merchant_id = ?,
                 detail__order_id = ?,
                 detail__payment_reference_id = ?,
                 detail__receive_amount = ?,
                 detail__payment_type = ?,
                 detail__payment_acquirer_bank = ?,
                 detail__transaction_date = ?,
                 detail__transaction_time = ?,
                 detail__order_description = ?,
                 detail__customer_id = ?`;

    await this.#transaction.query(sql, [
      this.#tdcpResponse.event,
      this.#tdcpResponse.merchant_id,
      this.#tdcpResponse.timestamp,
      this.#tdcpResponse.detail__receipt__transactionCode,
      this.#tdcpResponse.detail__receipt__status,
      this.#tdcpResponse.detail__receipt__xmlURL,
      this.#tdcpResponse.detail__receipt__pdfURL,
      this.#tdcpResponse.detail__response_code,
      this.#tdcpResponse.detail__response_message,
      this.#tdcpResponse.detail__merchant_id,
      this.#tdcpResponse.detail__order_id,
      this.#tdcpResponse.detail__payment_reference_id,
      this.#tdcpResponse.detail__receive_amount,
      this.#tdcpResponse.detail__payment_type,
      this.#tdcpResponse.detail__payment_acquirer_bank,
      this.#tdcpResponse.detail__transaction_date,
      this.#tdcpResponse.detail__transaction_time,
      this.#tdcpResponse.detail__order_description,
      this.#customerId,
    ]);
  }

  async #updateCustomerPaymentStatus() {
    const sql = `UPDATE customer SET PayStatus = '' WHERE CustomerID = ? AND RefNo1 = ? LIMIT 1`;
    await this.#transaction.query(sql, [this.#customerId, this.#registerRef]);
  }

  async updateTransaction() {
    try {
      this.#transaction = await pool.getConnection();
      await this.#transaction.beginTransaction();

      await this.#updateCustomerPaymentStatus();
      await this.#insertLog();

      await this.#transaction.commit();
      await this.#transaction.release();
    } catch (error) {
      await this.#transaction.rollback();
      await this.#transaction.release();
      await new ErrorLogRepository().saveErrorLog(error, req);
      throw error;
    }
  }
}
