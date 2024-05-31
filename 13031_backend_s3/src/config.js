/**
 * @type { {
 * app: {
 * env: string,
 * port: number,
 * domain: string,
 * jwtKey: string,
 * },
 * db: {
 * main: import('mariadb').PoolConfig,
 * bu8: import('mariadb').PoolConfig
 * }
 * } }
 */
const config = {
  app: {
    env: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    domain: process.env.DOMAIN,
    jwtKey: process.env.JWT_KEY,
  },
  db: {
    main: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectionLimit: process.env.DB_CONNECTION_LIMIT,
      metaAsArray: true,
      bigIntAsNumber: true,
      insertIdAsNumber: true,
    },
    mongo: {
        host: process.env.DB_HOST_MONGO,
        port: process.env.DB_PORT_MONGO,
        user: process.env.DB_USER_MONGO,
        password: process.env.DB_PASSWORD_MONGO,
        maxPoolSize: process.env.DB_POOL_SIZE_MONGO,
        database: process.env.DB_NAME_MONGO,
    }
  },
  s3: {
    ksp: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      endpoint: process.env.ENDPOINT,
    },
    bucketPhoto: process.env.BUCKET_PHOTO,
    bucketFile: process.env.BUCKET_FILE,
  },
};

export default config;
