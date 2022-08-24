"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("kelas_type", [
      {
        id: 1,
        nama: "7",
        createdAt: new Date(),
        createdBy: 1,
        updatedAt: new Date(),
        updatedBy: 1,
      },
      {
        id: 2,
        nama: "8",
        createdAt: new Date(),
        createdBy: 1,
        updatedAt: new Date(),
        updatedBy: 1,
      },
      {
        id: 3,
        nama: "9",
        createdAt: new Date(),
        createdBy: 1,
        updatedAt: new Date(),
        updatedBy: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("kelas_type", null, {});
  },
};
