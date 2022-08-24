"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class kelas_type extends Model {
    static associate(models) {
      kelas_type.hasMany(models.users);
      kelas_type.hasMany(models.kelas);
      kelas_type.hasMany(models.mapel);
    }
  }
  kelas_type.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "kelas_type",
    }
  );
  return kelas_type;
};
