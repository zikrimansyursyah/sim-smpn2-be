"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("users", [
      {
        id: 1,
        type: 1,
        no_ktp: "0",
        nuptk: "0",
        nama_lengkap: "Superadmin",
        username: "superadmin",
        password: "$2a$17$seOExPuTVLe9SS9nKob3jedvmpYJb4ZHd4xgCdp.yhU88048/84mi", //Superadmin@098
        jenis_kelamin: "Laki-Laki",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
