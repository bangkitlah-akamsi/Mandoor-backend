const Joi = require('joi');

const TokoPayloadSchema = Joi.object({
  nama_toko: Joi.string().required(),
  nama_pemilik: Joi.string().required(),
  kecamatan: Joi.string().required(),
  kota: Joi.string().required(),
  alamat: Joi.string().required(),
});

module.exports = { TokoPayloadSchema };
