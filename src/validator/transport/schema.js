const Joi = require('joi');

const TransportPayloadSchema = Joi.object({
  kecamatan_user: Joi.string().required(),
  kecamatan_mitra: Joi.string().required(),
  jarak: Joi.number().required(),
});

module.exports = { TransportPayloadSchema };
