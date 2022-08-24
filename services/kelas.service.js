const kelasRepository = require("../repositories/kelas.repository.js");
const { httpCode, responseMessage } = require("../utils/constant");

exports.findAllKelas = async () => {
  try {
    const kelas = await kelasRepository.findAllKelas();

    if (!kelas) {
      return {
        httpCode: httpCode.notFound,
      };
    }

    return {
      httpCode: httpCode.ok,
      data: kelas,
    };
  } catch (err) {
    console.error(err);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};
