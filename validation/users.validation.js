const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  is_remember: Joi.boolean().required(),
});

module.exports = {
  loginSchema,
};
