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
app.use(cors({ origin: ['http://localhost:3001', 'https://uat-ksp67-2.thaijobjob.com', 'https://ksp67-2.thaijobjob.com', 'https://ksp67-2.one.th'] }));

const insertLogGenQr = async (cusId, data) => {
  const setRedis = await redis4
    .multi()
    .set(cusId, JSON.stringify(data))
    .expire(cusId, 30 * 60)
    .exec();

  return setRedis;
};

// const uatKey = 'owb37oRQdRWrsh4moARw8AXcK7p8NicdZcJjUjXI';
// const prdKey = 'dedoCuyfpgkTavwDirHmyS4FmXEZgBYQPNPTnjMk';

app.post('/api/v2/pay/qr/', validateToken, async (req, res, next) => {
  const orderId = req.body.RefNo1;
  const amount = req.body.Amount;
  const desc = req.body.OrderDesc;
  const RID = desc.split('_')[0];
  const LID = desc.split('_')[1];
  const cusId = desc.split('_')[2];

  if (cusId.length !== 13) {
    return res.status(400).send({
      status: 'fail',
      message: 'เกิดข้อผิดพลาด',
    });
  }

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
    // const url = thaiDotComRes.data.link;
    const link = "https://new-portal-payment.one.th/INETServiceWeb/api/v1/bay/gen_qrcode"
    const { token, ref1, ref2 } = thaiDotComRes.data;
    const results = await axios.post(link, {
      access_token: token,
    });
    const qr = results.data.qrcode;
    
    await insertLogGenQr(cusId, data);

    const getRedis = await redis4.get(cusId);
    const dataRedis = JSON.parse(getRedis);

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

// app.post('/api/v2/pay/qr/uat', validateToken, async (req, res, next) => {
//   const orderId = req.body.RefNo1;
//   const amount = req.body.Amount;
//   const desc = req.body.OrderDesc;
//   const RID = desc.split('_')[0];
//   const LID = desc.split('_')[1];
//   const cusId = desc.split('_')[2];

//   const body = {
//     key: config.tdcpKeyUat,
//     orderId,
//     orderDesc: desc,
//     amount,
//     apUrl: 'http://www.irecruit.co.th/',
//     lang: 'T',
//     bankNo: 'BAY',
//     currCode: '764',
//     payType: 'QR',
//   };

//   try {
//     const keyExists = await redis4.exists(cusId);
//     if (keyExists) {
//       const data = await redis4.get(cusId);
//       const result = JSON.parse(data);
//       return res.status(200).send({
//         status: 'fail',
//         message: 'มีการสร้าง QR Code ไปแล้ว',
//         result,
//       });
//     }

//     const data = {
//       RoundID: +RID,
//       LocationID: +LID,
//       DateTime: new Date(),
//     };

//     const thaiDotComRes = await axios.post(config.tdcpUrlTest, body);
//     const url = thaiDotComRes.data.link;
//     const { token, ref1, ref2 } = thaiDotComRes.data;
//     const results = await axios.post(url, {
//       access_token: token,
//     });
//     const qr = results.data.qrcode;

//     await insertLogGenQr(cusId, data);

//     const getRedis = await redis4.get(cusId);
//     const dataRedis = JSON.parse(getRedis);

//     res.status(200).send({
//       status: 'success',
//       code: 1,
//       result: {
//         amount,
//         desc,
//         orderId,
//         ref1,
//         ref2,
//         qrCode: qr,
//         DateTime: dataRedis.DateTime,
//       },
//       message: '-',
//       cause: '-',
//     });
//   } catch (error) {
//     await new ErrorLogRepository().saveErrorLog(error, req);
//     if (axios.isAxiosError(error)) {
//       console.log('tdcp error', {
//         body,
//         response: error.response,
//         data: error.config,
//       });
//     }
//     next(error);
//   }
// });

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
