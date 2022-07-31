"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("users", [
      {
        id: 1,
        type: 1,
        no_ktp: "0",
        no_induk_sekolah: "0",
        nama_lengkap: "SUPERADMIN",
        tempat_lahir: "SUPERADMIN",
        tanggal_lahir: new Date(),
        username: "superadmin",
        password: "$2a$17$seOExPuTVLe9SS9nKob3jedvmpYJb4ZHd4xgCdp.yhU88048/84mi", //Superadmin@098
        no_telp: "081234567890",
        alamat: "SUPERADMIN",
        kelurahan: "SUPERADMIN",
        kecamatan: "SUPERADMIN",
        kabupaten: "SUPERADMIN",
        provinsi: "SUPERADMIN",
        jenis_kelamin: "Laki-Laki",
        is_active: true,
        is_delete: false,
        createdAt: new Date(),
        createdBy: 1,
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
