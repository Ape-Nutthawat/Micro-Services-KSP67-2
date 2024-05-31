import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import config from './config.js';
import routes from './index.routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
// app.use(cors(config.app.domain.split(',')));
app.use(cors({ origin: ['http://localhost:3001','http://localhost:3000', 'https://uat-ksp67.thaijobjob.com', 'https://ksp67.thaijobjob.com'] }));

app.use('/api/v2', routes);

app.get('/api/v2', (req, res) => {
  res.status(200).send('KSP user service IS RUNNING');
})

app.get('/api/reset', (req, res) => {
  res.status(200).send('reset');
  process.exit(0);
})

app.use((error, req, res, next) => {
  res.status(500).send({
    status: 'error',
    code: 0,
    error,
    message: 'internal error',
    cause: 'unknown',
  })
})

app.listen(config.app.port, () => {
  console.log(`[KSP user service] run on ${config.app.env} env and using port ${config.app.port}`);
})