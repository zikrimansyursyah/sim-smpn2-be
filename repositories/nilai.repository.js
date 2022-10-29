const db = require("../models/index.js");
const Nilai = db.nilai;
const Mapel = db.mapel;
const Pengajar = db.pengajar;
const Kelas = db.kelas;
const User = db.users;
const KelasType = db.kelas_type;
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
  const nilai = await sequelize.query(
    `
  SELECT a.*, c.nama AS nama_mapel
  FROM nilai a
  JOIN kelas b ON b.id = a.id_kelas 
  JOIN mapel c ON c.id = a.id_mapel 
  WHERE b.type = :type AND a.id_siswa = :id_siswa AND a.semester = :semester
  `,
    {
      type: QueryTypes.SELECT,
      replacements: {
        type,
        id_siswa,
        semester,
      },
    }
  );

  const mapel = await Mapel.findAll({
    where: { kelas: type },
    attributes: {
      exclude: ["createdAt", "updatedAt", "createdBy", "updatedBy"],
    },
    raw: true,
  });

  const namaKelas = await KelasType.findByPk(type);

  return { nilai, mapel, namaKelas };
};

exports.findRangkumanNilai = async (id_siswa) => {
  const nilai = sequelize.query(
    `
    SELECT a.id, c.nama AS nama_mapel, b.nama AS nama_kelas, a.semester, 
    CAST(ROUND(((a.nil_kehadiran + a.nil_tugas + a.nil_uts + a.nil_uas) / 4) ,0) as int) AS total_nilai
    FROM nilai a
    JOIN kelas b ON b.id = a.id_kelas 
    JOIN mapel c ON c.id = a.id_mapel 
    WHERE a.id_siswa = :id_siswa
  `,
    {
      type: QueryTypes.SELECT,
      replacements: { id_siswa },
    }
  );

  return nilai;
};

exports.findRekapAbsensi = async (id_kelas, id_mapel, semester) => {
  const nilai = await sequelize.query(
    `
  SELECT a.id, u.nama_lengkap, u.nisn, a.nil_kehadiran, u.id AS id_siswa,
  (SELECT p.total_pertemuan FROM pengajar p WHERE p.id_kelas = :id_kelas AND p.id_mapel = :id_mapel ) AS total_pertemuan
  FROM nilai a
  JOIN kelas b ON b.id = a.id_kelas 
  JOIN users u ON u.id = a.id_siswa 
  WHERE a.semester = :semester AND b.id = :id_kelas AND a.id_mapel = :id_mapel
  `,
    {
      type: QueryTypes.SELECT,
      replacements: { id_kelas, id_mapel, semester },
    }
  );

  const siswa = await User.findAll({
    where: { id_kelas },
    attributes: [
      "id",
      "nama_lengkap",
      "nisn",
      [
        sequelize.literal(`(
          SELECT p.total_pertemuan 
          FROM pengajar p 
          WHERE p.id_kelas = ${id_kelas} AND p.id_mapel = ${id_mapel}
        )`),
        "total_pertemuan",
      ],
    ],
    raw: true,
  });

  return { nilai, siswa };
};

exports.updateAbsensi = async (where, param) => {
  await Nilai.update(param, { where });
};
