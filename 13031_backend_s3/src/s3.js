import AWS from 'aws-sdk'
import config from './config.js';

AWS.config.update(config.s3.ksp)

const s3 = new AWS.S3();

export default s3;