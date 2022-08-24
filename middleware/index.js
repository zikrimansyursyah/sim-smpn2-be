const { verifyToken } = require("../utils/jwt.util.js");

exports.Validate = async (req, res, next) => {
  let access_token = req.headers["access_token"];
  req.isValidate = false;
  req.userLogged = null;
  const verif = await verifyToken(access_token);
  if (verif.isValid) {
    req.isValidate = true;
    req.userLogged = verif.data;
  }
  return next();
};

exports.Authorize = async (req, res, next) => {
  if (!req.isValidate) return res.status(403).json({ httpCode: 403, message: "Please Login First!" });
  return next();
};
