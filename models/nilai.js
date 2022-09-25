"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class nilai extends Model {
    static associate(models) {
      nilai.belongsTo(models.kelas);
      nilai.belongsTo(models.mapel);
      nilai.belongsTo(models.users);
    }
  }
  nilai.init(
    {
      id_kelas: {
        type: DataTypes.INTEGER,
      },
      id_mapel: {
        type: DataTypes.INTEGER,
      },
      id_siswa: {
        type: DataTypes.INTEGER,
      },
      semester: {
        type: DataTypes.STRING,
      },
      nil_kehadiran: {
        type: DataTypes.INTEGER,
      },
      nil_tugas: {
        type: DataTypes.INTEGER,
      },
      nil_uts: {
        type: DataTypes.INTEGER,
      },
      nil_uas: {
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
      modelName: "nilai",
      freezeTableName: true,
    }
  );
  return nilai;
};
