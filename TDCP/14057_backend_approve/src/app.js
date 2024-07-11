import express from 'express';
import cors from 'cors';
import config from './config.js';
// import { validateToken } from "./authtoken.js";
import { checkDuplicatePayment } from './check_duplicate_payment/check_duplicate_payment.controller.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors([config.app.domain]));
app.use(cors());

app.post('/api/v2/pay/approve', checkDuplicatePayment);

app.get('/api/v2/pay/approve', (req, res) => {
  res.status(200).send('[KSP payment gatewat check dupe service] is runnning');
})

app.get('/api/v2/pay/approve/reset', (req, res) => {
  res.status(200).send('[KSP payment gatewat check dupe service] is reset');
  process.exit(0);
})

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send({
    status: 'error',
    code: 0,
    error,
    message: 'internal error',
    cause: 'unknown',
  })
})

app.listen(config.app.port, () => {
  console.log(`[KSP payment gatewat check dupe service] run on ${config.app.env} env and using port ${config.app.port}`);
})
