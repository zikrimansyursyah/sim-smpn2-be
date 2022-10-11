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
  const { id_kelas, id_siswa, id_mapel, semester, nil_tugas, nil_uts, nil_uas } = req.fields;
  try {
    // cari jika data sudah ada
    const checkNilaiExist = await nilaiRepository.findNilaiMapelKHS(id_kelas, id_siswa, semester, id_mapel);

    if (checkNilaiExist) {
      let paramUpdate = {
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
    const { nilai, mapel, namaKelas } = await nilaiRepository.findKHSSiswa(id_siswa, kelas, semester);

    let dataKHS = [];

    if (!nilai.length) {
      (mapel || []).map((item) => {
        dataKHS.push({
          id_mapel: item.id,
          nama_mapel: item.nama,
          nama_kelas: namaKelas.nama,
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
            nama_kelas: namaKelas.nama,
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
          nama_kelas: namaKelas.nama,
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

exports.findRangkumanNilai = async (req) => {
  const { id_siswa } = req.fields;

  try {
    const rangNilai = await nilaiRepository.findRangkumanNilai(id_siswa);

    return {
      httpCode: httpCode.ok,
      data: rangNilai,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.findRekapAbsensi = async (req) => {
  const { id_kelas, id_mapel, semester } = req.fields;

  try {
    const { nilai, siswa } = await nilaiRepository.findRekapAbsensi(id_kelas, id_mapel, semester);

    let rekapAbsensi = [];

    if (!nilai.length) {
      (siswa || []).map((item) => {
        rekapAbsensi.push({
          id: item.id,
          nama_siswa: item.nama_lengkap,
          nisn: item.nisn,
          total_absen: 0,
          total_pertemuan: item.total_pertemuan,
        });
      });

      return {
        httpCode: httpCode.ok,
        data: rekapAbsensi,
      };
    }

    (siswa || []).map((item) => {
      let dataTemp = null;

      (nilai || []).map((nil_item) => {
        if (nil_item.id_siswa === item.id) {
          dataTemp = {
            id: nil_item.id_siswa,
            nama_siswa: nil_item.nama_lengkap,
            nisn: nil_item.nisn,
            total_absen: nil_item.nil_kehadiran,
            total_pertemuan: nil_item.total_pertemuan,
          };
        }
      });

      if (!dataTemp) {
        rekapAbsensi.push({
          id: item.id,
          nama_siswa: item.nama_lengkap,
          nisn: item.nisn,
          total_absen: 0,
          total_pertemuan: item.total_pertemuan,
        });
      } else {
        rekapAbsensi.push(dataTemp);
      }
    });

    return {
      httpCode: httpCode.ok,
      data: rekapAbsensi,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.updateAbsensiSiswa = async (req) => {
  const { userLogged } = req;
  const { id_kelas, id_mapel, id_siswa, semester, nil_kehadiran } = req.fields;

  try {
    const checkNilaiExist = await nilaiRepository.findNilaiMapelKHS(id_kelas, id_siswa, semester, id_mapel);

    if (checkNilaiExist) {
      let param = {
        nil_kehadiran,
        updatedAt: new Date(),
        updatedBy: userLogged.id,
      };

      let whereClause = {
        id_kelas,
        id_mapel,
        id_siswa,
        semester,
      };

      await nilaiRepository.updateAbsensi(whereClause, param);
    } else {
      let field = {
        id_kelas,
        id_mapel,
        id_siswa,
        semester,
        nil_kehadiran,
        nil_tugas: 0,
        nil_uts: 0,
        nil_uas: 0,
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
