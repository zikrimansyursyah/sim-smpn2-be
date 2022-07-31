const db = require("../models/index.js");
const User = db.users;

exports.findByEmail = async (email) => {
  return await User.findOne({ where: { email, is_active: true, is_delete: false } });
};

exports.findByNIS = async (no_induk_sekolah) => {
  return await User.findOne({ where: { no_induk_sekolah, is_active: true, is_delete: false } });
};

exports.findByUsername = async (username) => {
  return await User.findOne({ where: { username, is_active: true, is_delete: false } });
};
