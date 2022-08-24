const jwt = require("jsonwebtoken");
const { httpCode, responseMessage } = require("./constant");

exports.generateToken = async (payload, isRemember = false) => {
  return await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: isRemember ? "168h" : "12h" });
};

exports.decodeToken = async (payload) => {
  return await jwt.verify(payload, process.env.JWT_SECRET_KEY);
};

exports.verifyToken = async (payload) => {
  try {
    const verif = await jwt.verify(payload, process.env.JWT_SECRET_KEY);
    if (verif) {
      return {
        httpCode: httpCode.ok,
        isValid: true,
        data: verif,
      };
    }
  } catch (error) {
    return {
      httpCode: httpCode.notFound,
      isValid: false,
    };
  }
};
