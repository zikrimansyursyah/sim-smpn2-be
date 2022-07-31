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
      nisn: {
        type: DataTypes.STRING,
        unique: true,
      },
      no_induk_sekolah: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      tingkat_kelas: DataTypes.INTEGER,
      id_kelas: DataTypes.INTEGER,
      nama_lengkap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama_panggilan: DataTypes.STRING,
      tempat_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal_lahir: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      photo: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_telp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: DataTypes.STRING,
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kelurahan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kecamatan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kabupaten: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      provinsi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mata_pelajaran: DataTypes.INTEGER,
      jenis_kelamin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status_pernikahan: DataTypes.STRING,
      pendidikan_terakhir: DataTypes.STRING,
      asal_sekolah: DataTypes.STRING,
      tahun_lulus_sekolah: DataTypes.INTEGER,
      gelar: DataTypes.STRING,
      jabatan: DataTypes.STRING,
      jabatan_tambahan: DataTypes.STRING,
      nama_ayah: DataTypes.STRING,
      nama_ibu: DataTypes.STRING,
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_delete: {
        type: DataTypes.BOOLEAN,
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
      modelName: "users",
    }
  );
  return users;
};
