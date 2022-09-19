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

exports.createPengajarAPI = async (req, res) => {
  const { httpCode, message } = await mapelService.createPengajar(req);

  return res.status(httpCode).json({
    httpCode,
    message: message ? message : responseMessage[httpCode],
  });
};

exports.getAllPengajarAPI = async (req, res) => {
  const { httpCode, data } = await mapelService.getAllPengajar(req);

  return res.status(httpCode).json({
    httpCode,
    message: responseMessage[httpCode],
    data: data ? data : [],
  });
};

exports.updatePengajarAPI = async (req, res) => {
  const { httpCode, message } = await mapelService.updatePengajar(req);

  return res.status(httpCode).json({
    httpCode,
    message: message ? message : responseMessage[httpCode],
  });
};

exports.deletePengajarAPI = async (req, res) => {
  const { httpCode } = await mapelService.deletePengajar(req);

  return res.status(httpCode).json({
    httpCode,
    message: responseMessage[httpCode],
  });
};

exports.createMapelAPI = async (req, res) => {
  const { httpCode, message } = await mapelService.createMapel(req);

  return res.status(httpCode).json({
    httpCode,
    message: message ? message : responseMessage[httpCode],
  });
};
