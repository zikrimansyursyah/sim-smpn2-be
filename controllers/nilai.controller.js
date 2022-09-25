const { responseMessage } = require("../utils/constant");
const nilaiService = require("../services/nilai.service.js");

exports.findUserKHSAPI = async (req, res) => {
  const { httpCode, data } = await nilaiService.findUserKHS(req);

  return res.status(httpCode).json({
    httpCode,
    message: responseMessage[httpCode],
    data: data,
  });
};