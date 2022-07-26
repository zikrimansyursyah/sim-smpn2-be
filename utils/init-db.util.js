const pg = require("pg");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST_DEV, DB_NAME_DEV, DB_PORT } = process.env;

const config = {
  user: DB_USER,
  database: "postgres",
  password: DB_PASSWORD,
  port: DB_PORT,
  host: DB_HOST_DEV,
};

const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
  client.query("CREATE DATABASE " + DB_NAME_DEV, function (err) {
    console.log("DB Sucessfuly initialize");
    client.end();
  });
});
