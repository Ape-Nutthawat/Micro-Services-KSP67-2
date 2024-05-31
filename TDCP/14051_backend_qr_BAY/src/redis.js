import Redis from 'ioredis';
import config from './config.js';

const redis4 = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  password: config.redis.password,
  db: 4,
});

export { redis4 };
