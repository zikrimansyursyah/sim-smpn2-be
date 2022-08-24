"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mapel extends Model {
    static associate(models) {
      mapel.hasMany(models.users);
      mapel.belongsTo(models.kelas_type);
    }
  }
  mapel.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kelas: {
        type: DataTypes.INTEGER,
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
      modelName: "mapel",
      freezeTableName: true,
    }
  );
  return mapel;
};
