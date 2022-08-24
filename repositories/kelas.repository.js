const db = require("../models/index.js");
const Kelas = db.kelas;

exports.findAllKelas = async () => {
  return await Kelas.findAll();
};
