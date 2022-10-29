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

exports.createPengajar = async (req) => {
  const { userLogged } = req;
  try {
    let field = {
      id_pengajar: Number(req.fields.guru),
      id_mapel: Number(req.fields.mapel),
      id_kelas: Number(req.fields.kelas),
    };

    const existData = await mapelRepository.checkPengajarExist(field);
    if (existData) {
      return {
        httpCode: httpCode.forbidden,
        message: "data tersebut sudah ada",
      };
    }

    const havePengajar = await mapelRepository.checkHavePengajar({ id_mapel: field.id_mapel, id_kelas: field.id_kelas });
    if (havePengajar) {
      return {
        httpCode: httpCode.forbidden,
        message: "data tersebut sudah ada",
      };
    }

    field.total_pertemuan = Number(req.fields.total_pertemuan);
    field.createdAt = new Date();
    field.updateAt = new Date();
    field.createdBy = userLogged.id;
    field.updatedBy = userLogged.id;

    await mapelRepository.createPengajar(field);

    return {
      httpCode: httpCode.ok,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.getAllPengajar = async (req) => {
  try {
    const pengajar = await mapelRepository.findAllPengajar(req.fields.first, req.fields.rows);
    if (!pengajar) {
      return {
        httpCode: httpCode.notFound,
      };
    }

    return {
      httpCode: httpCode.ok,
      data: pengajar,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.updatePengajar = async (req) => {
  const { userLogged } = req;
  const { id, mapel, kelas, guru, total_pertemuan } = req.fields;
  try {
    const pengajar = await mapelRepository.findById(id);
    if (!pengajar) {
      return {
        httpCode: httpCode.notFound,
        message: responseMessage.userNotFound,
      };
    }

    let field = {
      id_pengajar: Number(guru),
      id_mapel: Number(mapel),
      id_kelas: Number(kelas),
    };

    const existData = await mapelRepository.checkPengajarExist(field, id);
    if (existData) {
      return {
        httpCode: httpCode.forbidden,
        message: "data tersebut sudah ada",
      };
    }

    const havePengajar = await mapelRepository.checkHavePengajar({ id_mapel: field.id_mapel, id_kelas: field.id_kelas }, id);
    if (havePengajar) {
      return {
        httpCode: httpCode.forbidden,
        message: "data tersebut sudah ada",
      };
    }

    field.total_pertemuan = Number(total_pertemuan);

    await mapelRepository.editPengajar(id, userLogged.id, field);

    return {
      httpCode: httpCode.ok,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.deletePengajar = async (req) => {
  try {
    const pengajar = await mapelRepository.findById(req.fields.id);
    if (!pengajar) {
      return {
        httpCode: httpCode.notFound,
        message: responseMessage.userNotFound,
      };
    }

    await mapelRepository.deletePengajar(pengajar);
    return {
      httpCode: httpCode.ok,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.createMapel = async (req) => {
  const { userLogged } = req;
  try {
    let field = {
      nama: req.fields.nama,
      kelas: req.fields.kelas,
      createdAt: new Date(),
      updateAt: new Date(),
      createdBy: userLogged.id,
      updatedBy: userLogged.id,
    };

    const existData = await mapelRepository.findOneMapel(req.fields.nama, req.fields.kelas);
    if (existData) {
      return {
        httpCode: httpCode.forbidden,
        message: "data tersebut sudah ada",
      };
      4;
    }

    await mapelRepository.restartIncrement();

    await mapelRepository.addMapel(field);

    return {
      httpCode: httpCode.ok,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};
