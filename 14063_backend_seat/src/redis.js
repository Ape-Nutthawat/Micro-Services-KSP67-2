import Redis from 'ioredis';
import config from './config.js';

const redis1 = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  password: config.redis.password,
  db: 1,
});

export { redis1 };
