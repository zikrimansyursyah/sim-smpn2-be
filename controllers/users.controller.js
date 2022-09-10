const userService = require("../services/users.service.js");
const jwt = require("../utils/jwt.util.js");
const { responseMessage } = require("../utils/constant");

const getToken = async (data) => {
  const userData = {};
  const ignored = ["password", "is_active", "is_delete", "createdBy", "createdAt", "updatedAt", "updatedBy"];
  Object.keys(data.user.dataValues).map((key) => {
    if (!ignored.includes(key)) {
      userData[key] = data.user.dataValues[key];
    }
  });

  const token = await jwt.generateToken(userData, data.is_remember);
  return token;
};

exports.getDashboardAPI = async (req, res) => {
  const { httpCode, message, data } = await userService.getDashboardData();

  return res.status(httpCode).json({
    httpCode,
    message: message ? message : responseMessage[httpCode],
    data,
  });
};

exports.login = async (req, res) => {
  const { httpCode, message, data } = await userService.login(req);

  if (httpCode !== 200) {
    return res.status(httpCode).json({
      httpCode,
      message: message ? message : responseMessage[httpCode],
    });
  }

  return res.status(httpCode).json({
    httpCode,
    message: message ? message : responseMessage[httpCode],
    token: await getToken(data),
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

// CRUD User
exports.updateUserAPI = async (req, res) => {
  const { httpCode, message, data } = await userService.updateUser(req);

  if (httpCode !== 200) {
    return res.status(httpCode).json({
      httpCode,
      message: message ? message : responseMessage[httpCode],
    });
  }

  return res.status(httpCode).json({
    httpCode,
    message: message ? message : responseMessage[httpCode],
    token: await getToken(data),
  });
};

exports.findAllTeachersAPI = async (req, res) => {
  const { httpCode, message, data, count } = await userService.findAllTeachers(req);

  return res.status(httpCode).json({
    httpCode,
    message: message ? message : responseMessage[httpCode],
    data,
    count,
  });
};

exports.findAllStundetsAPI = async (req, res) => {
  const { httpCode, message, data, count } = await userService.findAllStudents(req);

  return res.status(httpCode).json({
    httpCode,
    message: message ? message : responseMessage[httpCode],
    data,
    count,
  });
};

exports.createUserAPI = async (req, res) => {
  if (!req.isValidate) {
    return res.status(403).json({
      httpCode: 403,
      message: responseMessage.loginFirst,
    });
  }
  const { httpCode, message, data } = await userService.createUser(req);

  return res.status(httpCode).json({
    httpCode,
    message: message ? message : responseMessage[httpCode],
  });
};

exports.deleteUserAPI = async (req, res) => {
  if (!req.isValidate) {
    return res.status(403).json({
      httpCode: 403,
      message: responseMessage.loginFirst,
    });
  }
  const { httpCode, message } = await userService.deleteUser(req);

  return res.status(httpCode).json({
    httpCode,
    message: message ? message : responseMessage[httpCode],
  });
};

exports.findAllTeachersDropdownAPI = async (req, res) => {
  const { httpCode, message, data } = await userService.findAllTeachersDropdown();

  return res.status(httpCode).json({
    httpCode,
    message: message ? message : responseMessage[httpCode],
    data,
  });
};
