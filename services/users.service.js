const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users.repository.js");
const userValidation = require("../validation/users.validation");
const { httpCode, responseMessage } = require("../utils/constant");

exports.login = async (req) => {
  const { value, error } = userValidation.loginSchema.validate(req.fields);

  if (error) {
    return {
      httpCode: httpCode.badRequest,
      message: error,
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
      };
    }

    const checkPassword = await bcrypt.compare(password, user.password);
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
  } catch (err) {
    console.error(err);
    return {
      httpCode: httpCode.internalServerError,
    };
  }
};
