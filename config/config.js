require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST_DEV, DB_HOST_TEST, DB_HOST_PROD, DB_NAME_DEV, DB_NAME_TEST, DB_NAME_PROD, DB_USER_PROD, DB_PASSWORD_PROD } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_DEV,
    host: DB_HOST_DEV,
    dialect: "mysql",
  },

  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_TEST,
    host: DB_HOST_TEST,
    dialect: "mysql",
  },
  production: {
    username: DB_USER_PROD,
    password: DB_PASSWORD_PROD,
    database: DB_NAME_PROD,
    host: DB_HOST_PROD,
    dialect: "mysql",
  },
};
