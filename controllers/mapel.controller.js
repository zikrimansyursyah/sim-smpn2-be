const { responseMessage } = require("../utils/constant");
const mapelService = require("../services/mapel.service.js");

exports.getAllMapelAPI = async (req, res) => {
  const { httpCode, data } = await mapelService.findAllMapel();

  return res.status(httpCode).json({
    httpCode,
    message: responseMessage[httpCode],
    data: data,
  });
};
