const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const userRepository = require("../repositories/users.repository.js");
const userValidation = require("../validation/users.validation");
const { httpCode, responseMessage } = require("../utils/constant");
const dotenv = require("dotenv");
dotenv.config();
const saltRound = process.env.SALT_ROUND;
const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.getDashboardData = async () => {
  try {
    const { siswa, guru, mapel } = await userRepository.getDashboardData();

    return {
      httpCode: httpCode.ok,
      data: { siswa, guru, mapel },
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.login = async (req) => {
  const { value, error } = userValidation.loginSchema.validate(req.fields);

  if (error) {
    return {
      httpCode: httpCode.invalidParam,
      message: error.details[0].message,
    };
  }

  const { username, password, is_remember } = value;
  try {
    let user = await userRepository.findByUsername(username);
    if (!user) {
      user = await userRepository.findByNIS(username);
    }
    if (!user) {
      user = await userRepository.findByEmail(username);
    }

    if (!user) {
      return {
        httpCode: httpCode.notFound,
        message: responseMessage.userNotFound,
      };
    }

    const decrypt = CryptoJS.AES.decrypt(user.password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    const checkPassword = password === decrypt;
    if (!checkPassword) {
      return {
        httpCode: httpCode.forbidden,
        message: responseMessage.wrongPassword,
      };
    }

    return {
      httpCode: httpCode.ok,
      data: { user, is_remember },
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
      message: error,
    };
  }
};

exports.updateUser = async (req) => {
  const { value, error } = userValidation.userSchema.validate(req.fields);

  if (error) {
    return {
      httpCode: httpCode.invalidParam,
      message: error.details[0].message,
    };
  }

  const { id_user, updated_by } = req.headers;

  try {
    const user = await userRepository.findByID(id_user);

    if (!user) {
      return {
        httpCode: httpCode.notFound,
        message: responseMessage.userNotFound,
      };
    }

    const paramUpdate = {};
    Object.keys(value).map((key) => {
      if (key === "password") {
        paramUpdate[key] = CryptoJS.AES.encrypt(value[key], SECRET_KEY).toString();
      } else {
        paramUpdate[key] = value[key] === "" ? null : value[key];
      }
    });

    await userRepository.updateUser(id_user, updated_by, paramUpdate);
    const userAfterUpdate = await userRepository.findByID(id_user);

    return {
      httpCode: httpCode.ok,
      data: { user: userAfterUpdate },
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.findAllTeachers = async (req) => {
  const { value, error } = userValidation.findAllTeachersSchema.validate(req.fields);

  if (error) {
    return {
      httpCode: httpCode.invalidParam,
      message: error.details[0].message,
    };
  }

  const { first, rows, filter } = value;

  try {
    const teachers = await userRepository.findAllTeachers(rows, first, filter);
    let result = [];
    if (teachers && teachers.rows.length > 0) {
      teachers.rows.map((data, index) => {
        let _dataTemp = {};
        Object.keys(data.dataValues).map((key) => {
          if (["provinsi", "kabupaten", "kecamatan", "kelurahan"].includes(key)) {
            _dataTemp[key] = Number(data.dataValues[key]);
          } else if (key.includes("password")) {
            _dataTemp[key] = CryptoJS.AES.decrypt(data.dataValues[key], SECRET_KEY).toString(CryptoJS.enc.Utf8);
          } else if (["createdAt", "updatedAt", "tanggal_lahir"].includes(key)) {
            const d = new Date(data.dataValues[key]);
            _dataTemp[key] = d;
          } else if (!["is_active", "is_delete", "createdBy", "updatedBy"].includes(key)) {
            _dataTemp[key] = data.dataValues[key] ? data.dataValues[key] : "";
          }
        });
        result.push(_dataTemp);
      });
    }

    return {
      httpCode: httpCode.ok,
      data: result,
      count: teachers.count,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.findAllStudents = async (req) => {
  const { value, error } = userValidation.findAllStundentsSchema.validate(req.fields);

  if (error) {
    return {
      httpCode: httpCode.invalidParam,
      message: error.details[0].message,
    };
  }

  const { first, rows, filter, id_kelas } = value;

  try {
    const students = await userRepository.findAllStudent(rows, first, filter, id_kelas);
    let result = [];
    if (students && students.rows.length > 0) {
      students.rows.map((data, index) => {
        let _dataTemp = {};
        Object.keys(data.dataValues).map((key) => {
          if (["provinsi", "kabupaten", "kecamatan", "kelurahan"].includes(key)) {
            _dataTemp[key] = Number(data.dataValues[key]);
          } else if (key.includes("password")) {
            _dataTemp[key] = CryptoJS.AES.decrypt(data.dataValues[key], SECRET_KEY).toString(CryptoJS.enc.Utf8);
          } else if (["createdAt", "updatedAt", "tanggal_lahir"].includes(key)) {
            const d = new Date(data.dataValues[key]);
            _dataTemp[key] = d;
          } else if (!["is_active", "is_delete", "createdBy", "updatedBy"].includes(key)) {
            _dataTemp[key] = data.dataValues[key] ? data.dataValues[key] : "";
          }
        });
        result.push(_dataTemp);
      });
    }

    return {
      httpCode: httpCode.ok,
      data: result,
      count: students.count,
    };
  } catch (error) {
    console.error(error);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};

exports.createUser = async (req) => {
  const { userLogged } = req;
  const { type } = req.fields;
  const { value, error } = userValidation.userSchema.validate(req.fields.dataForm);

  if (error) {
    return {
      httpCode: httpCode.invalidParam,
      message: error.details[0].message,
    };
  }

  try {
    let user = await userRepository.findByUsername(value.username);
    if (user) {
      return {
        httpCode: httpCode.forbidden,
        message: "Username sudah digunakan",
      };
    }

    if (!user) {
      user = await userRepository.findByNIS(value.no_induk_sekolah);
      if (user) {
        return {
          httpCode: httpCode.forbidden,
          message: "Nomor Induk Sekolah sudah digunakan",
        };
      }
    }

    if (!user && value.email) {
      user = await userRepository.findByEmail(value.email);
      if (user) {
        return {
          httpCode: httpCode.forbidden,
          message: "email sudah digunakan",
        };
      }
    }

    const paramUpdate = {};
    Object.keys(value).map((key) => {
      paramUpdate[key] = value[key] === "" ? null : value[key];
    });
    paramUpdate.type = type;
    paramUpdate.is_active = true;
    paramUpdate.is_delete = false;
    paramUpdate.createdAt = new Date();
    paramUpdate.updateAt = new Date();
    paramUpdate.createdBy = userLogged.id;
    paramUpdate.updatedBy = userLogged.id;

    const encryptedPassword = CryptoJS.AES.encrypt(paramUpdate.password, SECRET_KEY).toString();
    paramUpdate.password = encryptedPassword;

    await userRepository.createUser(paramUpdate);
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

exports.deleteUser = async (req) => {
  const { value, error } = userValidation.deleteUserSchema.validate(req.fields);

  if (error) {
    return {
      httpCode: httpCode.invalidParam,
      message: error.details[0].message,
    };
  }

  try {
    const user = await userRepository.findByID(value.id);

    if (!user) {
      return {
        httpCode: httpCode.notFound,
        message: responseMessage.userNotFound,
      };
    }

    await userRepository.deleteUser(value.id);

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

exports.findAllTeachersDropdown = async () => {
  try {
    const teacher = await userRepository.findAllTeacherDropdown();
    if (!teacher) {
      return {
        httpCode: httpCode.notFound,
        message: responseMessage.userNotFound,
      };
    }

    let result = [];
    (teacher || []).map((item) => {
      result.push({ id: item.id, nama: item.nama_lengkap });
    });

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

exports.findAllStudentDropdown = async (req) => {
  try {
    const student = await userRepository.findAllStudentDropdown(req.fields.id_kelas);
    if (!student) {
      return {
        httpCode: httpCode.notFound,
        message: responseMessage.userNotFound,
      };
    }

    let result = [];
    (student || []).map((item) => {
      result.push({ value: item.id, name: item.nama_lengkap });
    });

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
