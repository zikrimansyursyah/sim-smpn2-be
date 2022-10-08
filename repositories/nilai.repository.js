const db = require("../models/index.js");
const Nilai = db.nilai;
const Mapel = db.mapel;
const Pengajar = db.pengajar;
const Kelas = db.kelas;
const User = db.users;
const { Op, QueryTypes, literal } = require("sequelize");
const { sequelize } = require("../models/index.js");

exports.findUserKHS = async (id_kelas, id_siswa, semester, kelas) => {
  const nilai = await Nilai.findAll({
    where: { id_kelas, id_siswa, semester },
    attributes: {
      include: [
        [
          sequelize.literal(`(
                        SELECT kelas.nama
                        FROM kelas as kelas
                        WHERE kelas.id = nilai.id_kelas
                    )`),
          "nama_kelas",
        ],
        [
          sequelize.literal(`(
                        SELECT mapel.nama
                        FROM mapel as mapel
                        WHERE mapel.id = nilai.id_mapel
                    )`),
          "nama_mapel",
        ],
      ],
    },
    raw: true,
  });

  const mapel = await Mapel.findAll({
    where: { kelas },
    attributes: {
      include: [
        [
          sequelize.literal(`(
                        SELECT kelas.nama
                        FROM kelas as kelas
                        WHERE kelas.id = ${id_kelas}
                    )`),
          "nama_kelas",
        ],
      ],
    },
    raw: true,
  });

  return { nilai, mapel };
};

exports.findNilaiMapelKHS = async (id_kelas, id_siswa, semester, id_mapel) => {
  return await Nilai.findOne({
    where: { id_kelas, id_siswa, semester, id_mapel },
  });
};

exports.createNilaiKHS = async (field) => {
  return await Nilai.create(field);
};

exports.updateNilaiMapelKHS = async (where, param) => {
  return await Nilai.update(param, { where });
};

exports.findDropdownMapelKHSGuru = async (id_pengajar) => {
  return await Pengajar.findAll({
    where: { id_pengajar },
    attributes: [
      "id",
      "id_pengajar",
      "id_kelas",
      "id_mapel",
      [
        sequelize.literal(`(
          SELECT kelas.nama
          FROM kelas as kelas
          WHERE kelas.id = pengajar.id_kelas
        )`),
        "nama_kelas",
      ],
      [
        sequelize.literal(`(
          SELECT mapel.nama
          FROM mapel as mapel
          WHERE mapel.id = pengajar.id_mapel
        )`),
        "nama_mapel",
      ],
    ],
    raw: true,
  });
};

exports.findKHSGuru = async (id_kelas, id_mapel, semester) => {
  const nilai = await Nilai.findAll({
    where: { id_kelas, id_mapel, semester },
    attributes: {
      include: [
        [
          sequelize.literal(`(
                        SELECT kelas.nama
                        FROM kelas as kelas
                        WHERE kelas.id = nilai.id_kelas
                    )`),
          "nama_kelas",
        ],
      ],
      exclude: ["createdAt", "updatedAt", "createdBy", "updatedBy"],
    },
    raw: true,
  });

  const siswa = await User.findAll({
    where: { type: 4, id_kelas },
    attributes: [
      "id",
      "nama_lengkap",
      [
        sequelize.literal(`(
          SELECT kelas.nama
          FROM kelas as kelas
          WHERE kelas.id = users.id_kelas
        )`),
        "nama_kelas",
      ],
    ],
    raw: true,
  });

  return { nilai, siswa };
};

exports.findKHSSiswa = async (id_siswa, type, semester) => {
  const nilai = await Nilai.findAll({
    where: { id_siswa, semester },
    include: [
      {
        model: Kelas,
        where: { type },
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt", "createdBy", "updatedBy"],
    },
    raw: true,
  });

  const mapel = await Mapel.findAll({
    where: { kelas: type },
    attributes: {
      include: [
        [
          sequelize.literal(`(
                        SELECT kelas.nama
                        FROM kelas as kelas
                        WHERE kelas.id = ${id_kelas}
                    )`),
          "nama_kelas",
        ],
      ],
    },
    raw: true,
  });

  return { nilai, mapel };
};
