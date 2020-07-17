module.exports = {
  type: "mysql",
  host:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_HOST
      : process.env.DB_HOST,
  port:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_PORT
      : process.env.DB_PORT,
  username:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_USERNAME
      : process.env.DB_USERNAME,
  password:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_PASSWORD
      : process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_NAME
      : process.env.DB_NAME,
  synchronize: true,
  logging: false,
  dropSchema: process.env.NODE_ENV === "test" ? true : false,
  entities: [__dirname + "/src/entities/**/*.ts"],
  migrations: [__dirname + "/src/migration/**/*.ts"],
  subscribers: [__dirname + "/src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: __dirname + "/src/entities",
    migrationsDir: __dirname + "/src/migration",
    subscribersDir: __dirname + "/src/subscriber"
  }
};
