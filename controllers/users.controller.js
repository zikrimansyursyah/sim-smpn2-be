const userService = require("../services/users.service.js");
const jwt = require("../utils/jwt.util.js");
const { responseMessage } = require("../utils/constant");

exports.login = async (req, res) => {
  const { httpCode, message, data } = await userService.login(req);

  if (httpCode !== 200) {
    return res.status(httpCode).json({
      httpCode,
      message: message ? message : responseMessage[httpCode],
    });
  }

  const userData = {};
  const ignored = ["password", "no_ktp", "is_active", "is_delete", "createdBy", "createdAt", "updatedAt", "updatedBy"];
  Object.keys(data.user.dataValues).map((key) => {
    if (!ignored.includes(key)) {
      userData[key] = data.user.dataValues[key];
    }
  });

  const token = await jwt.generateToken(userData, data.is_remember);

  return res.status(httpCode).json({
    httpCode,
    message: message ? message : responseMessage[httpCode],
    token,
  });
};

exports.validateAuth = async (req, res) => {
  const { httpCode, isValid, data } = await jwt.verifyToken(req.headers["access_token"]);

  return res.status(httpCode).json({
    httpCode,
    isValid,
    data,
    message: responseMessage[httpCode],
  });
};
