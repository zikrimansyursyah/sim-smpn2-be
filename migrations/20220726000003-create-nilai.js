"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("nilai", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_kelas: {
        type: Sequelize.INTEGER,
      },
      id_mapel: {
        type: Sequelize.INTEGER,
      },
      id_siswa: {
        type: Sequelize.INTEGER,
      },
      semester: {
        type: Sequelize.STRING,
      },
      nil_kehadiran: {
        type: Sequelize.INTEGER,
      },
      nil_tugas: {
        type: Sequelize.INTEGER,
      },
      nil_uts: {
        type: Sequelize.INTEGER,
      },
      nil_uas: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("nilai");
  },
};
