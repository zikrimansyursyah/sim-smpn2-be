const { responseMessage } = require("../utils/constant");
const kelasService = require("../services/kelas.service.js");

exports.getAllKelasAPI = async (req, res) => {
  const { httpCode, data } = await kelasService.findAllKelas();

  return res.status(httpCode).json({
    httpCode,
    message: responseMessage[httpCode],
    data: data,
  });
};
