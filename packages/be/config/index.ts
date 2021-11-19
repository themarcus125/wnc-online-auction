import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { loading } from '@/utils/logs';
import { AppConfig, DatabaseConfig, MailConfig, JwtConfig } from './config.t';
dotenvExpand(dotenv.config());

const {
  APPNAME,
  NODE_ENV,
  HOST,
  PORT,
  JWT_SECRET_KEY,
  JWT_EXPIRATION_TIME,
  CLIENT_URL,
} = process.env;
export const appConfig: AppConfig & JwtConfig = {
  name: APPNAME || 'biddlybe',
  mode: NODE_ENV || 'development',
  host: HOST || 'localhost',
  port: +(PORT || '3000') || 3000,
  clientURL: CLIENT_URL || 'localhost:3001',
  jwtSecret: JWT_SECRET_KEY || 'biddlysecret',
  expirationTime: +(JWT_EXPIRATION_TIME || '3600') || 3600,
};

const { DB, DBNAME, DBHOST, DBUSER, DBPASS, DBURL } = process.env;
export const dbConfig: DatabaseConfig = {
  database: DB || 'MONGODB',
  name: DBNAME,
  host: DBHOST,
  user: DBUSER,
  pass: DBPASS,
  url:
    DBURL ||
    `mongodb+srv://${DBUSER}:${DBPASS}>@${DBHOST}/${DBNAME}?retryWrites=true&w=majority`,
};

const { EMAIL_SERVICE, EMAIL_HOST, EMAIL_PORT, EMAIL_ADDRESS, EMAIL_PASSWORD } =
  process.env;
export const mailConfig: MailConfig = {
  service: EMAIL_SERVICE || 'gmail',
  host: EMAIL_HOST || 'smtp.gmail.com',
  port: +(EMAIL_PORT || '587') || 587,
  address: EMAIL_ADDRESS,
  pass: EMAIL_PASSWORD,
};

export const otpConfig = {
  length: 7,
};

loading('Config');
// console.dir(appConfig);
// console.dir(dbConfig);
// console.dir(mailConfig);
// console.dir(jwtConfig);
