import Redis from 'ioredis';
import config from './config.js';

const redis15 = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  password: config.redis.password,
  db: 15,
});

export { redis15 };
