"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class kelas extends Model {
    static associate(models) {
      kelas.hasMany(models.users);
    }
  }
  kelas.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wali_kelas: DataTypes.INTEGER,
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updateBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "kelas",
    }
  );
  return kelas;
};
