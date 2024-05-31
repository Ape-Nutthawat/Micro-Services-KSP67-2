import { MongoClient } from 'mongodb';
import config from './config.js';

const url = `mongodb://${config.db.mongo.host}:${config.db.mongo.port}`;

const client = new MongoClient(url, {
  maxPoolSize: config.db.mongo.maxPoolSize,
  auth: {
    username: config.db.mongo.user,
    password: config.db.mongo.password,
  },
});

const mongoDB = client.db(config.db.mongo.database);

export default mongoDB;
