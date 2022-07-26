const jwt = require("jsonwebtoken");

exports.generateToken = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "12h" });
};

exports.decodeToken = async (payload) => {
  return await jwt.verify(payload, process.env.JWT_SECRET_KEY);
};

exports.verifyToken = async (payload) => {
  let result = {
    httpCode: 403,
    isValid: false,
    data: null,
    message: null,
  };
  try {
    const verif = await jwt.verify(payload, process.env.JWT_SECRET_KEY);
    if (verif) {
      result.httpCode = 200;
      result.isValid = true;
      result.data = verif;
      result.message = "success";
    }
    return result;
  } catch (error) {
    result.message = "Access Token invalid!";
    return result;
  }
};
