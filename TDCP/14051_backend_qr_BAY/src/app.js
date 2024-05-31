import express from 'express';
import cors from 'cors';
import axios from 'axios';
import config from './config.js';
import ErrorLogRepository from './error-log.repository.js';
// import { pool } from './database.js';
import { validateToken } from './authtoken.js';
import { redis4 } from './redis.js';

const app = express();
const { port, env } = config.app;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// app.use(cors(config.app.domain.split(',')));
app.use(cors({ origin: ['http://localhost:3001', 'https://uat-ksp67.thaijobjob.com', 'https://ksp67.thaijobjob.com'] }));

const insertLogGenQr = async (cusId, data) => {
  const setRedis = await redis4
    .multi()
    .set(cusId, JSON.stringify(data))
    .expire(cusId, 30 * 60)
    .exec();

  return setRedis;
};

// const uatKey = 'q11MEwpZKRFaZOJvvfUocyYvvvkbuH8lNtqhjURN';
// const prdKey = '7NG3xj3zZw2WyKlT1Ym6jCepRVaA8PwkleY6zX0K';

app.post('/api/v2/pay/qr/', validateToken, async (req, res, next) => {
  const orderId = req.body.RefNo1;
  const amount = req.body.Amount;
  const desc = req.body.OrderDesc;
  // console.log(" 😎 ~ app.post ~ desc : ", desc)
  const RID = desc.split('_')[0];
  // console.log(" 😎 ~ app.post ~ RID : ", RID)
  const LID = desc.split('_')[1];
  // console.log(" 😎 ~ app.post ~ LID : ", LID)
  const cusId = desc.split('_')[2];
  // console.log(" 😎 ~ app.post ~ cusId : ", cusId)

  if (cusId.length !== 13) {
    return res.status(400).send({
      status: 'fail',
      message: 'เกิดข้อผิดพลาด',
    });
  }

  // console.log(parseInt(amount));
  if (parseInt(amount) != 545 && parseInt(amount) != 1045) {
    return res.status(400).send({
      status: 'fail',
      message: 'ราคาไม่ถูกต้อง',
    });
  }

  const body = {
    key: config.tdcpKeyPrd,
    orderId,
    orderDesc: desc,
    amount,
    apUrl: 'http://www.irecruit.co.th/',
    lang: 'T',
    bankNo: 'BAY',
    currCode: '764',
    payType: 'QR',
  };
  try {
    const keyExists = await redis4.exists(cusId);
    // console.log(' 😎 ~ genQr ~ keyExists : ', keyExists);
    if (keyExists) {
      const data = await redis4.get(cusId);
      const result = JSON.parse(data);
      return res.status(200).send({
        status: 'fail',
        message: 'มีการสร้าง QR Code ไปแล้ว',
        result,
      });
    }

    const data = {
      RoundID: +RID,
      LocationID: +LID,
      DateTime: new Date(),
    };

    const thaiDotComRes = await axios.post(config.tdcpUrlPrd, body);
    // console.log(' 😎 ~ app.post ~ thaiDotComRes : ', thaiDotComRes.data);
    const url = thaiDotComRes.data.link;
    const { token, ref1, ref2 } = thaiDotComRes.data;
    const results = await axios.post(url, {
      access_token: token,
    });
    const qr = results.data.qrcode;
    
    const setRedis = await insertLogGenQr(cusId, data);
    // console.log(' 😎 ~ genQrUatOLD ~ setRedis : ', setRedis);

    const getRedis = await redis4.get(cusId);
    const dataRedis = JSON.parse(getRedis);
    // console.log(" 😎 ~ genQrUat ~ dataRedis : ", dataRedis)

    res.status(200).send({
      status: 'success',
      code: 1,
      result: {
        amount,
        desc,
        orderId,
        ref1,
        ref2,
        qrCode: qr,
        DateTime: dataRedis.DateTime,
      },
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    if (axios.isAxiosError(error)) {
      console.log('tdcp error', {
        body,
        response: error.response,
        data: error.config,
      });
    }
    next(error);
  }
});

app.post('/api/v2/pay/qr/uat', validateToken, async (req, res, next) => {
  const orderId = req.body.RefNo1;
  const amount = req.body.Amount;
  const desc = req.body.OrderDesc;
  const RID = desc.split('_')[0];
  const LID = desc.split('_')[1];
  const cusId = desc.split('_')[2];

  const body = {
    key: config.tdcpKeyUat,
    orderId,
    orderDesc: desc,
    amount,
    apUrl: 'http://www.irecruit.co.th/',
    lang: 'T',
    bankNo: 'BAY',
    currCode: '764',
    payType: 'QR',
  };
  try {
    const keyExists = await redis4.exists(cusId);
    // console.log(' 😎 ~ genQr ~ keyExists : ', keyExists);
    if (keyExists) {
      const data = await redis4.get(cusId);
      const result = JSON.parse(data);
      return res.status(200).send({
        status: 'fail',
        message: 'มีการสร้าง QR Code ไปแล้ว',
        result,
      });
    }
    // const thaiDateTime = new Date().toLocaleString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Bangkok' });
    const data = {
      RoundID: +RID,
      LocationID: +LID,
      DateTime: new Date(),
      // DateTime: thaiDateTime,
    };

    const thaiDotComRes = await axios.post(config.tdcpUrlTest, body);
    const url = thaiDotComRes.data.link;
    const { token, ref1, ref2 } = thaiDotComRes.data;
    const results = await axios.post(url, {
      access_token: token,
    });
    const qr = results.data.qrcode;


    const setRedis = await insertLogGenQr(cusId, data);
    // console.log(' 😎 ~ genQrUatOLD ~ setRedis : ', setRedis);

    const getRedis = await redis4.get(cusId);
    const dataRedis = JSON.parse(getRedis);
    // console.log(" 😎 ~ genQrUat ~ dataRedis : ", dataRedis)

    res.status(200).send({
      status: 'success',
      code: 1,
      result: {
        amount,
        desc,
        orderId,
        ref1,
        ref2,
        qrCode: qr,
        DateTime: dataRedis.DateTime,
      },
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    if (axios.isAxiosError(error)) {
      console.log('tdcp error', {
        body,
        response: error.response,
        data: error.config,
      });
    }
    next(error);
  }
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
  console.log(`[KSP payment gateway qr generator service] running on ${env} env and using port ${port}`);
});
