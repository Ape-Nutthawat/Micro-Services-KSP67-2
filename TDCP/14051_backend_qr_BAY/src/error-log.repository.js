import mongoBD from './database.mongo.js';

export default class ErrorLogRepository {
  collection = mongoBD.collection('error_log');

  async saveErrorLog(error, req) {
    try {
      const dateNow = new Date();
      const ymd = dateNow.getFullYear() + '-' + ('0' + (dateNow.getMonth() + 1)) + '-' + ('0' + dateNow.getDate()).slice(-2);
      const timestamp = ymd + ' ' + new Date().toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      
      const errorObject = JSON.parse(JSON.stringify(error));

      const modelLog = {
        timestamp: timestamp,
        errorMessage: error.message,
        errorObject: errorObject,
        stackTrace: error.stack,
        request: {
          method: req.method,
          endpoint: req.url,
          headers: req.headers,
          body: req.body,
        },
        app: null,
      };
      
      return await this.collection.insertOne(modelLog);

    } catch (err) {
      console.error('Error saving log:', err.message);
      throw err;
    }
  }
}
