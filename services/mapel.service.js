const mapelRepository = require("../repositories/mapel.repository.js");
const { httpCode, responseMessage } = require("../utils/constant");

exports.findAllMapel = async () => {
  try {
    const mapel = await mapelRepository.findAllMapel();

    if (!mapel) {
      return {
        httpCode: httpCode.notFound,
      };
    }

    return {
      httpCode: httpCode.ok,
      data: mapel,
    };
  } catch (err) {
    console.error(err);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};
