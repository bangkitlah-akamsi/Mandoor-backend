const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required(),
  nomorwa: Joi.string().required(),
  alamat: Joi.string().required(),
});

module.exports = { UserPayloadSchema };
