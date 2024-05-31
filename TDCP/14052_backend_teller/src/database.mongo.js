import { MongoClient } from 'mongodb';
import config from './config.js';

const url = `mongodb://${config.mongo.host}:${config.mongo.port}`;

const client = new MongoClient(url, {
  maxPoolSize: config.mongo.maxPoolSize,
  auth: {
    username: config.mongo.user,
    password: config.mongo.password,
  },
});

const mongoDB = client.db(config.mongo.database);

export default mongoDB;
