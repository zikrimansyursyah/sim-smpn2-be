const httpCode = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500,
  ok: 200,
  accepted: 202,
};

const responseMessage = {
  400: "Bad Request",
  401: "Login First!",
  403: "Forbidden",
  404: "Tidak Ditemukan",
  500: "Internal Server Error",
  200: "Success",
  202: "Accepted",
  wrongPassword: "Password yang anda masukan salah",
};

module.exports = {
  httpCode,
  responseMessage,
};
