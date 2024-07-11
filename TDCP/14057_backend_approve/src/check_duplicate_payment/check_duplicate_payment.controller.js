import CheckDuplicatePaymentService from './check_duplicate_payment.service.js';

export const checkDuplicatePayment = async (req, res, next) => {
  const body = req.body;
  // console.log("req : ", req.body);
  try {
    const response = await new CheckDuplicatePaymentService().checkDuplicatePayment(body);
    if (response.length !== 0) {
      if (response[0].PayStatus !== '*') {
        // console.log("Payment already");
        return res.status(200).send({
          code: '999',
          message: 'Payment already',
        });
      } else {
        return res.status(200).send({
          code: '000',
          message: 'Success',
        });
      }
    } else {
      // console.log('Invalid reference');
      return res.status(200).send({
        code: '999',
        message: 'Invalid reference',
      });
    }
  } catch (error) {
    next(error);
  }
};
