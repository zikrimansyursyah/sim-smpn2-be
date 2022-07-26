const db = require("../models/index.js");
const User = db.user;

exports.addUser = async (data) => {
  return await User.create(data);
};

exports.findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};
