"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("users_type", [
      {
        id: 1,
        nama: "Superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nama: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nama: "Guru",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        nama: "Murid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("users_type", null, {});
  },
};
