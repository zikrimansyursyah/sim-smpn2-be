const { verifyToken } = require("../util/jwt.util.js");

exports.Validate = async (req, res, next) => {
  const { access_token } = req.cookies;
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
  if (!req.isValidate)
    return res
      .status(403)
      .json({ httpCode: 403, message: "Please Login First!" });

  return next();
};
