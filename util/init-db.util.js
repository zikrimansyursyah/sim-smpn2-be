const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const config = {
  user: process.env.PG_USERNAME,
  database: "postgres",
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  host: process.env.PG_HOST,
};

const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
  client.query("CREATE DATABASE " + process.env.PG_DB, function (err) {
    console.log("DB Sucessfuly initialize");
    client.end();
  });
});
