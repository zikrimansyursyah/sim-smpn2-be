const db = require("../models/index.js");
const Pengajar = db.pengajar;
const Mapel = db.mapel;
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../models/index.js");

exports.findAllMapel = async () => {
  return await Mapel.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT a.nama
            FROM kelas_type AS a
            WHERE a.id = mapel.kelas
          )`),
          "nama_kelas",
        ],
      ],
    },
  });
};

exports.findAllPengajar = async (offset, limit, filter) => {
  return await Pengajar.findAndCountAll({
    offset,
    limit,
    order: [["updatedAt", "DESC"]],
    attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT users.nama_lengkap
            FROM users as users
            WHERE users.id = pengajar.id_pengajar
          )`),
          "guru",
        ],
        [
          sequelize.literal(`(
            SELECT kelas.nama
            FROM kelas as kelas
            WHERE kelas.id = pengajar.id_kelas
          )`),
          "kelas",
        ],
        [
          sequelize.literal(`(
          SELECT mapel.nama
          FROM mapel as mapel
          WHERE mapel.id = pengajar.id_mapel
        )`),
          "mapel",
        ],
      ],
    },
  });
};

exports.createPengajar = async (field) => {
  return await Pengajar.create(field);
};

exports.checkPengajarExist = async (data, id) => {
  let where = { where: data };
  if (id) {
    where = {
      where: {
        ...data,
        id: {
          [Op.not]: id,
        },
      },
    };
  }
  return await Pengajar.findOne(where);
};

exports.checkHavePengajar = async (data, id) => {
  let where = { where: data };
  if (id) {
    where = {
      where: {
        ...data,
        id: {
          [Op.not]: id,
        },
      },
    };
  }
  return await Pengajar.findOne(where);
};

exports.editPengajar = async (id, updatedBy, param) => {
  return await Pengajar.update({ ...param, updatedBy, updatedAt: new Date() }, { where: { id } });
};

exports.findById = async (id) => {
  return await Pengajar.findByPk(id);
};

exports.deletePengajar = async (pengajar) => {
  return await pengajar.destroy();
};

exports.findOneMapel = async (nama, kelas) => {
  return await Mapel.findOne({ where: { nama, kelas } });
};

exports.addMapel = async (field) => {
  return await Mapel.create(field);
};

exports.restartIncrement = async () => {
  const getLastId = await Mapel.findOne({ order: [["id", "DESC"]] });
  let last = getLastId ? getLastId.id + 1 : 1;
  await sequelize.query(`ALTER TABLE mapel AUTO_INCREMENT = ` + last);
};
