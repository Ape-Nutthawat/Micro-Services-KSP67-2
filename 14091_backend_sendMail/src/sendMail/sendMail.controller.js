import SendMailService from './sendMail.service.js';
import ErrorLogRepository from '../error-log.repository.js';

/**
 *
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */

export const sendMail = async (req, res, next) => {
  const { receiver } = req.body;
  try {
    const result = await new SendMailService().sendMailRegister(receiver);

    if (result) {
      // console.log('Send Email Success.')
      return res.status(200).send({
        code: 1,
        message: 'success',
      });
    } else {
      return res.status(400).send({
        code: 0,
        message: 'error',
      });
    }
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const sendMailPayment = async (req, res, next) => {
  const { receiver } = req.body;
  try {
    const result = await new SendMailService().sendMailPayment(receiver);

    if (result) {
      // console.log('Send Email Success.')
      return res.status(200).send({
        code: 1,
        message: 'success',
      });
    } else {
      return res.status(400).send({
        code: 0,
        message: 'error',
      });
    }
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

export const sendMailRefund = async (req, res, next) => {
  const { receiver } = req.body;
  try {
    const result = await new SendMailService().sendMailRefund(receiver);

    if (result) {
      // console.log('Send Email Success.')
      return res.status(200).send({
        code: 1,
        message: 'success',
      });
    } else {
      return res.status(400).send({
        code: 0,
        message: 'error',
      });
    }
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};

