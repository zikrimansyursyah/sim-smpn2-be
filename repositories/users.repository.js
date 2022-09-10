const db = require("../models/index.js");
const User = db.users;
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../models/index.js");

exports.findByEmail = async (email) => {
  return await User.findOne({ where: { email, is_active: true, is_delete: false } });
};

exports.findByNIS = async (no_induk_sekolah) => {
  return await User.findOne({ where: { no_induk_sekolah, is_active: true, is_delete: false } });
};

exports.findByUsername = async (username) => {
  return await User.findOne({ where: { username, is_active: true, is_delete: false } });
};

exports.findByID = async (id) => {
  return await User.findOne({ where: { id, is_active: true, is_delete: false } });
};

exports.updateUser = async (id, updatedBy, param) => {
  return await User.update({ ...param, updatedBy, updatedAt: new Date() }, { where: { id } });
};

exports.findAllTeachers = async (limit, offset, filter) => {
  const { count, rows } = await User.findAndCountAll({
    where: {
      type: 3,
      is_delete: false,
      [Op.or]: [{ nuptk: { [Op.iLike]: "%" + filter + "%" } }, { no_induk_sekolah: { [Op.iLike]: "%" + filter + "%" } }, { nama_lengkap: { [Op.iLike]: "%" + filter + "%" } }],
    },
    offset,
    limit,
    order: [["nama_lengkap", "ASC"]],
    attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT a.nama
            FROM mapel a
            WHERE a.id = "users"."id_mata_pelajaran"
          )`),
          "mata_pelajaran",
        ],
      ],
    },
  });

  return { count, rows };
};

exports.findAllStudent = async (limit, offset, filter, id_kelas) => {
  const where = {
    type: 4,
    is_delete: false,
    [Op.or]: [{ nisn: { [Op.iLike]: "%" + filter + "%" } }, { no_induk_sekolah: { [Op.iLike]: "%" + filter + "%" } }, { nama_lengkap: { [Op.iLike]: "%" + filter + "%" } }],
  };

  if (id_kelas && id_kelas !== "") {
    where.id_kelas = id_kelas;
  }

  const { count, rows } = await User.findAndCountAll({
    where: where,
    offset,
    limit,
    order: [["nama_lengkap", "ASC"]],
    attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT a.nama
            FROM kelas a
            WHERE a.id = "users"."id_kelas"
          )`),
          "kelas",
        ],
      ],
    },
  });

  return { count, rows };
};

exports.createUser = async (field) => {
  return await User.create(field);
};

exports.deleteUser = async (id) => {
  return await User.update({ is_delete: true, is_active: false }, { where: { id } });
};

exports.getDashboardData = async () => {
  const siswa = await sequelize.query(
    `
  SELECT COUNT(*) AS total, MIN(a."createdAt") AS sejak, MAX(a."updatedAt") AS last_updated
  FROM users a
  WHERE a."type" = 4
  LIMIT 1
  `,
    { type: QueryTypes.SELECT }
  );

  const guru = await sequelize.query(
    `
  SELECT COUNT(*) AS total, MIN(a."createdAt") AS sejak, MAX(a."updatedAt") AS last_updated
  FROM users a
  WHERE a."type" = 3
  LIMIT 1
  `,
    { type: QueryTypes.SELECT }
  );

  const mapel = await sequelize.query(
    `
  SELECT COUNT(*) AS total, MIN(a."createdAt") AS sejak, MAX(a."updatedAt") AS last_updated
  FROM mapel a
  LIMIT 1
  `,
    { type: QueryTypes.SELECT }
  );

  return { siswa, guru, mapel };
};

exports.findAllTeacherDropdown = async () => {
  return await User.findAll({ where: { type: 3, is_active: true, is_delete: false } });
};
