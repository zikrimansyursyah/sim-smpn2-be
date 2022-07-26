"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.belongsTo(models.users_type);
    }
  }
  users.init(
    {
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      no_ktp: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nuptk: {
        type: DataTypes.STRING,
        unique: true,
      },
      nama_lengkap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_telp: DataTypes.STRING,
      email: DataTypes.STRING,
      alamat: DataTypes.STRING,
      mata_pelajaran: DataTypes.STRING,
      jenis_kelamin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pendidikan_terakhir: DataTypes.STRING,
      jabatan: DataTypes.STRING,
      jabatan_tambahan: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
