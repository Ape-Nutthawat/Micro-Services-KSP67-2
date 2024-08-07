
/**
 * @type { {
 * app: {
 * env: string,
 * port: number,
 * domain: string
 * },
 * db: {
 * main: import('mariadb').PoolConfig
 * }
 * } }
 */
const config = {
  app: {
    env: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    domain: process.env.DOMAIN,
    jwtKey: process.env.JWT_KEY
  },
  db: {
    main: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectionLimit: process.env.DB_CONNECTION_LIMIT,
      metaAsArray: true
    }
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
},
}

export default config;