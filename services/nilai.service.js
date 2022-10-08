const nilaiRepository = require("../repositories/nilai.repository.js");
const { httpCode, responseMessage } = require("../utils/constant");

exports.findUserKHS = async (req) => {
  const { userLogged } = req;
  const { id_kelas, id_siswa, semester, kelas, is_siswa } = req.fields;
  try {
    const { nilai, mapel } = await nilaiRepository.findUserKHS(id_kelas, is_siswa ? userLogged.id : id_siswa, semester, kelas);

    let dataKHS = [];

    if (!nilai.length) {
      (mapel || []).map((item) => {
        dataKHS.push({
          id_mapel: item.id,
          nama_mapel: item.nama,
          nama_kelas: item.nama_kelas,
          semester: semester,
          nil_kehadiran: 0,
          nil_tugas: 0,
          nil_uts: 0,
          nil_uas: 0,
        });
      });

      return {
        httpCode: httpCode.ok,
        data: dataKHS,
      };
    }

    (mapel || []).map((item) => {
      let _dataTemp = null;

      nilai.map((nil_item) => {
        if (nil_item.id_mapel === item.id) {
          _dataTemp = {
            id_mapel: nil_item.id_mapel,
            nama_mapel: nil_item.nama_mapel,
            nama_kelas: nil_item.nama_kelas,
            semester: semester,
            nil_kehadiran: nil_item.nil_kehadiran,
            nil_tugas: nil_item.nil_tugas,
            nil_uts: nil_item.nil_uts,
            nil_uas: nil_item.nil_uas,
          };
        }
      });

      if (_dataTemp === null) {
        dataKHS.push({
          id_mapel: item.id,
          nama_mapel: item.nama,
          nama_kelas: item.nama_kelas,
          semester: semester,
          nil_kehadiran: 0,
          nil_tugas: 0,
          nil_uts: 0,
          nil_uas: 0,
        });
      } else {
        dataKHS.push(_dataTemp);
      }
    });

    return {
      httpCode: httpCode.ok,
      data: dataKHS,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.updateNilaiKHS = async (req) => {
  const { userLogged } = req;
  const { id_kelas, id_siswa, id_mapel, semester, nil_kehadiran, nil_tugas, nil_uts, nil_uas } = req.fields;
  try {
    // cari jika data sudah ada
    const checkNilaiExist = await nilaiRepository.findNilaiMapelKHS(id_kelas, id_siswa, semester, id_mapel);

    if (checkNilaiExist) {
      let paramUpdate = {
        nil_kehadiran,
        nil_tugas,
        nil_uts,
        nil_uas,
        updatedAt: new Date(),
        updatedBy: userLogged.id,
      };

      let whereClause = {
        id_kelas,
        id_mapel,
        id_siswa,
        semester,
      };

      await nilaiRepository.updateNilaiMapelKHS(whereClause, paramUpdate);
    } else {
      let field = {
        id_kelas,
        id_mapel,
        id_siswa,
        semester,
        nil_kehadiran,
        nil_tugas,
        nil_uts,
        nil_uas,
        createdAt: new Date(),
        createdBy: userLogged.id,
        updatedAt: new Date(),
        updatedBy: userLogged.id,
      };

      await nilaiRepository.createNilaiKHS(field);
    }

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

exports.findDropdownMapelKHSGuru = async (req) => {
  const { id_pengajar } = req.fields;
  try {
    const result = await nilaiRepository.findDropdownMapelKHSGuru(id_pengajar);

    return {
      httpCode: httpCode.ok,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.findGuruKHS = async (req) => {
  const { id_kelas, id_mapel, semester } = req.fields;
  try {
    const { nilai, siswa } = await nilaiRepository.findKHSGuru(id_kelas, id_mapel, semester);

    let dataKHS = [];

    if (!nilai.length) {
      (siswa || []).map((item) => {
        dataKHS.push({
          id_siswa: item.id,
          nama_siswa: item.nama_lengkap,
          nama_kelas: item.nama_kelas,
          semester: semester,
          nil_kehadiran: 0,
          nil_tugas: 0,
          nil_uts: 0,
          nil_uas: 0,
        });
      });

      return {
        httpCode: httpCode.ok,
        data: dataKHS,
      };
    }

    (siswa || []).map((item) => {
      let _dataTemp = null;

      nilai.map((nil_item) => {
        if (nil_item.id_siswa === item.id) {
          _dataTemp = {
            id_siswa: nil_item.id_siswa,
            nama_siswa: item.nama_lengkap,
            nama_kelas: nil_item.nama_kelas,
            semester: semester,
            nil_kehadiran: nil_item.nil_kehadiran,
            nil_tugas: nil_item.nil_tugas,
            nil_uts: nil_item.nil_uts,
            nil_uas: nil_item.nil_uas,
          };
        }
      });

      if (_dataTemp === null) {
        dataKHS.push({
          id_siswa: item.id,
          nama_siswa: item.nama_lengkap,
          nama_kelas: item.nama_kelas,
          semester: semester,
          nil_kehadiran: 0,
          nil_tugas: 0,
          nil_uts: 0,
          nil_uas: 0,
        });
      } else {
        dataKHS.push(_dataTemp);
      }
    });

    return {
      httpCode: httpCode.ok,
      data: dataKHS,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.findSiswaKHS = async (req) => {
  const { id_siswa, kelas, semester } = req.fields;
  try {
    const nilai = await nilaiRepository.findKHSSiswa(id_siswa, kelas, semester);

    let dataKHS = [];

    if (!nilai.length) {
      (mapel || []).map((item) => {
        dataKHS.push({
          id_mapel: item.id,
          nama_mapel: item.nama,
          nama_kelas: item.nama_kelas,
          semester: semester,
          nil_kehadiran: 0,
          nil_tugas: 0,
          nil_uts: 0,
          nil_uas: 0,
        });
      });

      return {
        httpCode: httpCode.ok,
        data: dataKHS,
      };
    }

    (mapel || []).map((item) => {
      let _dataTemp = null;

      nilai.map((nil_item) => {
        if (nil_item.id_mapel === item.id) {
          _dataTemp = {
            id_mapel: nil_item.id_mapel,
            nama_mapel: nil_item.nama_mapel,
            nama_kelas: nil_item.nama_kelas,
            semester: semester,
            nil_kehadiran: nil_item.nil_kehadiran,
            nil_tugas: nil_item.nil_tugas,
            nil_uts: nil_item.nil_uts,
            nil_uas: nil_item.nil_uas,
          };
        }
      });

      if (_dataTemp === null) {
        dataKHS.push({
          id_mapel: item.id,
          nama_mapel: item.nama,
          nama_kelas: item.nama_kelas,
          semester: semester,
          nil_kehadiran: 0,
          nil_tugas: 0,
          nil_uts: 0,
          nil_uas: 0,
        });
      } else {
        dataKHS.push(_dataTemp);
      }
    });

    return {
      httpCode: httpCode.ok,
      data: dataKHS,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};
