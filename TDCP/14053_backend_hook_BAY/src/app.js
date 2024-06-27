import express from 'express';
import cors from 'cors';
import config from './config.js';
import checkTime from "./middleware.js";
// import { validateToken } from "./authtoken.js";
import PaymentService from './payment/payment.service.js';


const app = express();
const { port, env } = config.app;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use(cors());

app.post('/api/v2/pay/callback', async (req, res, next) => {
  // console.log('callback from tdcp', {
  //   data: req.body,
  // });
  try {
    const {
      detail,
      merchant_id,
      event,
      timestamp,
    } = req.body;
    const form = {
      event,
      merchant_id,
      timestamp,
      detail__receipt__transactionCode: detail?.receipt?.transactionCode || '',
      detail__receipt__status: detail?.receipt?.status || '',
      detail__receipt__xmlURL: detail?.receipt?.xmlURL || '',
      detail__receipt__pdfURL: detail?.receipt?.pdfURL || '',
      detail__response_code: detail.response_code,
      detail__response_message: detail.response_message,
      detail__merchant_id: detail.merchant_id,
      detail__order_id: detail.order_id,
      detail__payment_reference_id: detail.payment_reference_id,
      detail__receive_amount: detail.receive_amount,
      detail__payment_type: detail.payment_type,
      detail__payment_acquirer_bank: detail.payment_acquirer_bank,
      detail__transaction_date: detail.transaction_date,
      detail__transaction_time: detail.transaction_time,
      detail__order_description: detail.order_description,
    };
    await new PaymentService(
      form,
      detail.order_id,
      detail.order_description
    ).updateTransaction()
    res.status(200).send({
      message: 'Transaction successfully updated'
    });
  } catch (error) {
    console.log('[Field] update transaction error: ', error);
    next(error);
  }
});

app.post('/api/pay/callback/uat', async (req, res, next) => {
  // console.log('callback from tdcp', {
  //   data: req.body,
  // });
  try {
    const {
      detail,
      merchant_id,
      event,
      timestamp,
    } = req.body;
    const form = {
      event,
      merchant_id,
      timestamp,
      detail__receipt__transactionCode: detail?.receipt?.transactionCode || '',
      detail__receipt__status: detail?.receipt?.status || '',
      detail__receipt__xmlURL: detail?.receipt?.xmlURL || '',
      detail__receipt__pdfURL: detail?.receipt?.pdfURL || '',
      detail__response_code: detail.response_code,
      detail__response_message: detail.response_message,
      detail__merchant_id: detail.merchant_id,
      detail__order_id: detail.order_id,
      detail__payment_reference_id: detail.payment_reference_id,
      detail__receive_amount: detail.receive_amount,
      detail__payment_type: detail.payment_type,
      detail__payment_acquirer_bank: detail.payment_acquirer_bank,
      detail__transaction_date: detail.transaction_date,
      detail__transaction_time: detail.transaction_time,
      detail__order_description: detail.order_description,
    };
    await new PaymentService(
      form,
      detail.order_id,
      detail.order_description
    ).updateTransaction()
    res.status(200).send({
      message: 'Transaction successfully updated'
    });
  } catch (error) {
    console.log('[Field] update transaction error: ', error);
    next(error);
  }
});

app.get('/api/v2/pay/callback', (req, res) => {
  res.send('[KSP payment gateway callback service] is running');
});

app.get('/api/v2/pay/callback/reset', (req, res) => {
  res.send('[KSP payment gateway callback service] is reset');
  process.exit(0);
});

app.use((err, req, res, next) => {
  console.log({
    url: req.originalUrl,
    body: req.body,
    err,
  });
  res.status(500).send({
    status: 'fail',
    message: 'เกิดข้อผิดพลาด',
  });
});

app.listen(port, () => {
  console.log(`[KSP payment gateway callback service] running on ${env} env and using port ${port}`);
});
