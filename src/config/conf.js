const { config } = require('dotenv');
const { env } = process;

const pg = {
    host: env.PG_HOST || 'localhost',
    port: env.PG_PORT || 5432,
    user: env.PG_USER || 'postgres',
    password: env.PG_PASSWORD || 'root',
    database: env.PG_DB_NAME || 'inout',
    maxPool: 75,
    minPool: 2,
};

const server = {
    httpPort: env.HTTP_PORT || 4000,
    nodeEnv: env.NODE_ENV || 'development',
    refreshToken: {
        secret: env.REFRESH_TOKEN_SECRET || 'secret',
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN || '2d',
    },
    accessToken: {
        secret: env.ACCESS_TOKEN_SECRET || 'secret',
        expiresIn: env.ACCESS_TOKEN_EXPIRES_IN || '2d',
    },
};

const Admin = {
    username: env.PHONE_NUMBER || 'arif_holding',
    password: env.PASSWORD || '949354411',
};

module.exports = {
    pg,
    server,
    Admin,
};
