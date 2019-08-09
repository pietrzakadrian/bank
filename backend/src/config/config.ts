import * as dotenv from "dotenv";

dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === "test";

export default {
  name: "V2X Core",
  version: "1.0",
  host: process.env.APP_HOST || "127.0.0.1",
  environment: process.env.NODE_ENV || "development",
  port:
    (isTestEnvironment ? process.env.TEST_APP_PORT : process.env.APP_PORT) ||
    "8000",
  pagination: {
    page: 1,
    maxRows: 20
  },
  auth: {
    secretKey: process.env.SECRET_KEY || "4C31F7EFD6857D91E729165510520424"
  },
  db: {
    host: isTestEnvironment ? process.env.TEST_DB_HOST : process.env.DB_HOST,
    port: isTestEnvironment ? process.env.TEST_DB_PORT : process.env.DB_PORT,
    username: isTestEnvironment
      ? process.env.TEST_DB_USERNAME
      : process.env.DB_USERNAME,
    password: isTestEnvironment
      ? process.env.TEST_DB_PASSWORD
      : process.env.DB_PASSWORD,
    database: isTestEnvironment ? process.env.TEST_DB_NAME : process.env.DB_NAME
  },
  admin: {
    login: parseInt(process.env.ADMIN_LOGIN, 10) || 3323,
    password: process.env.ADMIN_PASSWORD || "root",
    name: process.env.ADMIN_NAME || "Bank",
    surname: process.env.ADMIN_SURNAME || "Application",
    email: process.env.ADMIN_EMAIL || "example@gmail.com"
  },
  author: {
    login: parseInt(process.env.AUTHOR_LOGIN, 10) || 9922,
    password: process.env.AUTHOR_PASSWORD || "root",
    name: process.env.AUTHOR_NAME || "Adrian",
    surname: process.env.AUTHOR_SURNAME || "Pietrzak",
    email: process.env.AUTHOR_EMAIL || "example@example.com"
  },
  logging: {
    dir: process.env.LOGGING_DIR || "logs",
    level: process.env.LOGGING_LEVEL || "debug"
  }
};
