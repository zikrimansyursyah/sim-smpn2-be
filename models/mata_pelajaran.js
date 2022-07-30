"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mata_pelajaran extends Model {
    static associate(models) {
      mata_pelajaran.hasMany(models.users);
    }
  }
  mata_pelajaran.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kelas: DataTypes.INTEGER,
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updateBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "mata_pelajaran",
    }
  );
  return mata_pelajaran;
};
