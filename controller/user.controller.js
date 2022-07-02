const jwt = require("../util/jwt.util.js");

exports.login = async (request, response) => {
  console.log(request.fields);
  // const { result, httpCode, message, data } = await userService.login(request.fields);
  // if (!result) return response.status(httpCode).json({ httpCode: httpCode, message: message });

  // const token = await jwt.generateToken({
  //   id_user: data.id_user,
  //   email: data.email,
  //   id_role: data.id_role,
  // });

  return response.status(202).json({
    httpCode: 202,
    message: "success",
  });
};
