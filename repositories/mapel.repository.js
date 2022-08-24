const db = require("../models/index.js");
const Mapel = db.mapel;
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
