import S3 from '../s3.js';
import config from '../config.js';
import { pool } from '../database.js';

export default class S3Service {
  async uploadImg(FileImg, CustomerID) {
    let ex = FileImg.mimetype.split('/');
    let key = 'FileImg' + '.' + CustomerID + '.' + ex[1];

    const params = {
      Bucket: config.s3.bucketPhoto, // Path
      Key: `pic/${key}`, // Filename
      Body: FileImg.data,
      ContentDisposition: 'inline',
      ContentType: FileImg.mimetype,
    };

    await S3.upload(params).promise();

    return  { key: params.Key };
  }

  async uploadFileRequestCustomerID(FileCustomerID, CustomerID) {
    let ex = FileCustomerID.mimetype.split('/');
    let key = 'FileCustomerID' + '.' + CustomerID + '.' + ex[1];

    const params = {
      Bucket: config.s3.bucketPhoto, // Path
      Key: `request/${key}`, // Filename
      Body: FileCustomerID.data,
      ContentDisposition: 'inline',
      ContentType: FileCustomerID.mimetype,
    };

    await S3.upload(params).promise();

    return { key: params.Key };
  }

  async getImgFileBase64(fileName) {
    const params = {
      Bucket: config.s3.bucketPhoto,
      Key: fileName,
    };

    const { Body } = await S3.getObject(params).promise();

    return Body.toString('base64');
  }

  async getFiles(fileName) {
    const params = {
      Bucket: config.s3.bucketPhoto,
      Key: fileName,
    };
    const url = await S3.getSignedUrlPromise('getObject', params);
    return url;
  }

  async moveFile(FileImg, CustomerID, LogID) {
    try {
      let ex = FileImg.mimetype.split('/');
      let key = 'FileImg' + '.' + CustomerID + '.' + ex[1];
      let backUpFileName = 'FileImg' + '.' + CustomerID + `.${LogID}` + '.' + ex[1];
      const params = {
        Bucket: config.s3.bucketPhoto, // Path
        Key: `edit/oldpic/${backUpFileName}`, // Filename
        CopySource: `/${config.s3.bucketPhoto}/pic/${key}`,
      };
      await S3.copyObject(params).promise();
      return backUpFileName;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async uploadUpdateImg(FileImg, CustomerID) {
    let ex = FileImg.mimetype.split('/');
    let key = 'pic/FileImg' + '.' + CustomerID + '.' + ex[1];

    const params = {
      Bucket: config.s3.bucketPhoto, // Path
      Key: key, // Filename
      Body: FileImg.data,
      ContentDisposition: 'inline',
      ContentType: FileImg.mimetype,
    };

    await S3.upload(params).promise();

    return { key: params.Key };
  }

  async uploadLog(backUpFileName, LogID) {
    const FileImgOld = `edit/oldpic/${backUpFileName}`;
    const sql = `UPDATE update_customer_log SET FileImgOld = ? WHERE id = ? LIMIT 1`;
    const result = await pool.query(sql, [FileImgOld, LogID]);
    return result;
  }

  async uploadFileUpdateCustomerID(FileCustomerID, CustomerID) {
    let ex = FileCustomerID.mimetype.split('/');
    let key = 'FileCustomerID' + '.' + CustomerID + '.' + ex[1];

    const params = {
      Bucket: config.s3.bucketPhoto, // Path
      Key: `edit/file-cusid/${key}`, // Filename
      Body: FileCustomerID.data,
      ContentDisposition: 'inline',
      ContentType: FileCustomerID.mimetype,
    };

    await S3.upload(params).promise();

    return { key: params.Key };
  }
  
  async uploadFileBookBank(FileCustomerID, CustomerID) {
    let ex = FileCustomerID.mimetype.split('/');
    let key = 'FileBookBank' + '.' + CustomerID + '.' + ex[1];

    const params = {
      Bucket: config.s3.bucketPhoto, // Path
      Key: `request_refund/bookbank/${key}`, // Filename
      Body: FileCustomerID.data,
      ContentDisposition: 'inline',
      ContentType: FileCustomerID.mimetype,
    };

    await S3.upload(params).promise();

    return { key: params.Key };
  }

  async moveFileBookBank(FileBookBank, CustomerID, LogID) {
    try {
      let ex = FileBookBank.mimetype.split('/');
      let key = 'FileBookBank' + '.' + CustomerID + '.' + ex[1];
      let backUpFileName = 'FileBookBank' + '.' + CustomerID + `.${LogID}` + '.' + ex[1];
      const params = {
        Bucket: config.s3.bucketPhoto, // Path
        Key: `request_refund/bookbank_old/${backUpFileName}`, // Filename
        CopySource: `/${config.s3.bucketPhoto}/request_refund/bookbank/${key}`,
      };
      await S3.copyObject(params).promise();
      return backUpFileName;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async UpdateFileBookBank(FileBookBank, CustomerID) {
    let ex = FileBookBank.mimetype.split('/');
    let key = 'FileBookBank' + '.' + CustomerID + '.' + ex[1];

    const params = {
      Bucket: config.s3.bucketPhoto, // Path
      Key: `request_refund/bookbank/${key}`, // Filename
      Body: FileBookBank.data,
      ContentDisposition: 'inline',
      ContentType: FileBookBank.mimetype,
    };

    await S3.upload(params).promise();

    return { key: params.Key };
  }

  async insertLogFileBookBank(backUpFileName, LogID) {
    const FileBookBankOld = `request_refund/bookbank_old/${backUpFileName}`;
    const sql = `UPDATE request_refund_update_log SET FileBookBank = ? WHERE ID = ? LIMIT 1`;
    const result = await pool.query(sql, [FileBookBankOld, LogID]);
    return result;
  }
  
  async uploadFileRequestScore(FileCustomerID, CustomerID, shortUuid) {
    let ex = FileCustomerID.mimetype.split('/');
    let key = 'FileRequestScore' + '.' + CustomerID + `.${shortUuid}` + '.' + ex[1];

    const params = {
      Bucket: config.s3.bucketPhoto, // Path
      Key: `request_score/${key}`, // Filename
      Body: FileCustomerID.data,
      ContentDisposition: 'inline',
      ContentType: FileCustomerID.mimetype,
    };

    await S3.upload(params).promise();
    return { key: params.Key };
  }
}
