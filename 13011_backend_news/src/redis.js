import Redis from "ioredis";
import config from "./config.js"

const redis0 = new Redis({
    port: config.redis.port,
    host: config.redis.host,
    password: config.redis.password,
    db: 0
})

const redis1 = new Redis({
    port: config.redis.port,
    host: config.redis.host,
    password: config.redis.password,
    db: 1
})



export { redis0, redis1};