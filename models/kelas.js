"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class kelas extends Model {
    static associate(models) {
      kelas.hasMany(models.users);
      kelas.belongsTo(models.kelas_type);
    }
  }
  kelas.init(
    {
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wali_kelas: DataTypes.INTEGER,
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "kelas",
    }
  );
  return kelas;
};
