const Joi = require('joi');

const MitraPayloadSchema = Joi.object({
  email: Joi.string().required(),
  mitraname: Joi.string().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required(),
  noKTP: Joi.string().required(),
  nomorwa: Joi.string().required(),
  alamat: Joi.string().required(),
  kecamatan: Joi.string().required(),
  kota: Joi.string().required(),
});

module.exports = { MitraPayloadSchema };
