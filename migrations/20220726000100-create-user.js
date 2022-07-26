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
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      nama_lengkap: {
        allowNull: false,
        type: Sequelize.STRING(1000),
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(1000),
      },
      no_telp: {
        type: Sequelize.STRING(20),
      },
      email: {
        type: Sequelize.STRING(100),
      },
      alamat: {
        type: Sequelize.STRING(1000),
      },
      mata_pelajaran: {
        type: Sequelize.STRING(100),
      },
      jenis_kelamin: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      pendidikan_terakhir: {
        type: Sequelize.STRING(20),
      },
      jabatan: {
        type: Sequelize.STRING(100),
      },
      jabatan_tambahan: {
        type: Sequelize.STRING(100),
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
