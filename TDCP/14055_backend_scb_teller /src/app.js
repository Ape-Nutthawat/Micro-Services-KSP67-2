import express from 'express';
import cors from 'cors';
import config from './config.js';
import { addTeller } from './tellerpayment/teller.controller.js';
// import { validateToken } from "./authtoken.js";

const app = express();
const { port, env } = config.app;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// app.use(cors());
app.use(cors({ origin: ['http://localhost:3001', 'https://uat-ksp67-2.thaijobjob.com', 'https://ksp67-2.thaijobjob.com', 'https://ksp67-2.one.th'] }));

app.post('/api/v2/pay/teller', addTeller)

app.get('/api/v2/payment/teller/running', (req, res) => {
  res.send('[KSP payment gateway teller service] is running');
});

app.get('/api/v2/pay/teller/reset', (req, res) => {
  res.send('[KSP payment gateway teller service] is reset');
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
  console.log(`[KSP payment gateway teller service] running on ${env} env and using port ${port}`);
});
