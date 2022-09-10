"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pengajar extends Model {
    static associate(models) {}
  }
  pengajar.init(
    {
      id_pengajar: {
        type: DataTypes.INTEGER,
      },
      id_kelas: {
        type: DataTypes.INTEGER,
      },
      id_mapel: {
        type: DataTypes.INTEGER,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "pengajar",
      freezeTableName: true,
    }
  );
  return pengajar;
};
