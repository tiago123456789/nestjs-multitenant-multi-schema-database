require('dotenv').config();

const config = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
  logging: process.env.ENV == 'dev' ? true : false,
  entities: [`dist/**/**.entity{.ts,.js}`],
  migrations: ['dist/src/db/migrations/*.js'],
};

module.exports = config;
