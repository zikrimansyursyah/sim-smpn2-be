"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users_type",
          key: "id",
        },
      },
      no_ktp: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      nuptk: {
        type: Sequelize.STRING(20),
      },
      nisn: {
        type: Sequelize.STRING(20),
      },
      no_induk_sekolah: {
        type: Sequelize.STRING(20),
      },
      tingkat_kelas: {
        type: Sequelize.INTEGER,
      },
      id_kelas: {
        type: Sequelize.INTEGER,
        references: {
          model: "kelas",
          key: "id",
        },
      },
      nama_lengkap: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      nama_panggilan: {
        type: Sequelize.STRING(20),
      },
      tempat_lahir: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      tanggal_lahir: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      photo: {
        type: Sequelize.STRING(1000),
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(25),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(1000),
      },
      no_telp: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      email: {
        type: Sequelize.STRING(255),
      },
      alamat: {
        allowNull: false,
        type: Sequelize.STRING(1000),
      },
      kelurahan: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      kecamatan: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      kota: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      provinsi: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      mata_pelajaran: {
        type: Sequelize.INTEGER,
        references: {
          model: "mata_pelajaran",
          key: "id",
        },
      },
      jenis_kelamin: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      jenis_kelamin: {
        type: Sequelize.STRING(20),
      },
      pendidikan_terakhir: {
        type: Sequelize.STRING(20),
      },
      asal_sekolah: {
        type: Sequelize.STRING(50),
      },
      tahun_lulus_sekolah: {
        type: Sequelize.INTEGER,
      },
      gelar: {
        type: Sequelize.STRING(20),
      },
      jabatan: {
        type: Sequelize.STRING(50),
      },
      jabatan_tambahan: {
        type: Sequelize.STRING(50),
      },
      nama_ayah: {
        type: Sequelize.STRING(255),
      },
      nama_ibu: {
        type: Sequelize.STRING(255),
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      is_delete: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
