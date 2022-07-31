"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("users_type", [
      {
        id: 1,
        nama: "Superadmin",
        createdAt: new Date(),
        createdBy: 1,
        updatedAt: new Date(),
        updatedBy: 1,
      },
      {
        id: 2,
        nama: "Admin",
        createdAt: new Date(),
        createdBy: 1,
        updatedAt: new Date(),
        updatedBy: 1,
      },
      {
        id: 3,
        nama: "Guru",
        createdAt: new Date(),
        createdBy: 1,
        updatedAt: new Date(),
        updatedBy: 1,
      },
      {
        id: 4,
        nama: "Murid",
        createdAt: new Date(),
        createdBy: 1,
        updatedAt: new Date(),
        updatedBy: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("users_type", null, {});
  },
};
