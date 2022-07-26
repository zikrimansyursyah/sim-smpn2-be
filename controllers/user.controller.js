const userService = require("../services/user.service.js");
const jwt = require("../utils/jwt.util.js");

exports.login = async (req, res) => {
  const { httpCode, message, data } = await userService.login(req.fields);
  if (httpCode === 403) return res.status(httpCode).json({ httpCode: httpCode, message: message });

  const { type, nuptk, nama_lengkap, username, email, mata_pelajaran, jenis_kelamin, jabatan, jabatan_tambahan, status } = data;
  let token;
  if (type == 3) {
    token = await jwt.generateToken({
      nuptk,
      nama_lengkap,
      username,
      email,
      mata_pelajaran,
      jenis_kelamin,
      jabatan,
      jabatan_tambahan,
      status,
    });
  } else {
    token = await jwt.generateToken({
      nama_lengkap,
      username,
      email,
      jenis_kelamin,
      status,
    });
  }

  return res.status(httpCode).json({
    httpCode,
    message,
    token,
  });
};

exports.validateAuth = async (req, res) => {
  const { httpCode, isValid, message, data } = await jwt.verifyToken(req.headers["access-token"]);

  return response.status(httpCode).json({
    httpCode,
    isValid,
    data,
    message,
  });
};
