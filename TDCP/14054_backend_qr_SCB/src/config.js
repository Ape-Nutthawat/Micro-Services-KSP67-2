/**
 * @type { {
 * app: {
 * env: string,
 * port: number,
 * domain: string,
 * jwtKey: string,
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
    },
    mongo: {
      host: process.env.DB_HOST_MONGO,
      port: process.env.DB_PORT_MONGO,
      user: process.env.DB_USER_MONGO,
      password: process.env.DB_PASSWORD_MONGO,
      maxPoolSize: process.env.DB_POOL_SIZE_MONGO,
      database: process.env.DB_NAME_MONGO,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
  tdcp: {
    uat: {
      tdcpScbKey: process.env.TDCP_SCB_KEY_UAT,
      tdcpOauthUrl: process.env.TDCP_OAUTH_URL_UAT,
      tdcpUrlScb: process.env.TDCP_URL_SCB_UAT,
    },
    prd: {
      tdcpScbKey: process.env.TDCP_SCB_KEY_PRD,
      tdcpOauthUrl: process.env.TDCP_OAUTH_URL_PRD,
      tdcpUrlScb: process.env.TDCP_URL_SCB_PRD,
    },
  },
};

export default config;
