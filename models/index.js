"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, { ...config, logging: false });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./users.js")(sequelize, Sequelize);
db.users_type = require("./users_type.js")(sequelize, Sequelize);
db.kelas = require("./kelas.js")(sequelize, Sequelize);
db.mapel = require("./mapel.js")(sequelize, Sequelize);
db.kelas_type = require("./kelas_type.js")(sequelize, Sequelize);
db.pengajar = require("./pengajar.js")(sequelize, Sequelize);
db.nilai = require("./nilai.js")(sequelize, Sequelize);

module.exports = db;
