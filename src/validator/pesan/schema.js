const Joi = require('joi');

const PesanPayloadSchema = Joi.object({
  user_id: Joi.string().required(),
  kecamatan_user: Joi.string().required(),
  kota_user: Joi.string().required(),
  alamat: Joi.string().required(),
});

const AcceptedPesanPayloadSchema = Joi.object({
  pesanan_id: Joi.string().required(),
  mitra_id: Joi.string().required(),
  barang: Joi.array(),
});

module.exports = { PesanPayloadSchema, AcceptedPesanPayloadSchema };
