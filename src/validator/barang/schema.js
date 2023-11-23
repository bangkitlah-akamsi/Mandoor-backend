const Joi = require('joi');

const BarangPayloadSchema = Joi.object({
  toko_id: Joi.string().required(),
  nama_barang: Joi.string().required(),
  harga_barang: Joi.number().integer().min(0).required(),
  status_ketersediaan: Joi.boolean().required(),
});

module.exports = { BarangPayloadSchema };
