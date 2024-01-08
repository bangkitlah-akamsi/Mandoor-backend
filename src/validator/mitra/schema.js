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
  skill: Joi.array().required(),
});

const Mitraemail = Joi.object({
  email: Joi.string().required(),
});

const Mitraname = Joi.object({
  mitraname: Joi.string().required(),
});

const MitraResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1,
    },
    nama: {
      type: 'string',
      example: 'bayudsatriyo',
    },
    email: {
      type: 'string',
      example: 'examplemitra@gmail.com',
    },
    fullname: {
      type: 'string',
      example: 'bayu dwi satriyo',
    },
    alamat: {
      type: 'string',
      example: 'Solo',
    },
    saldo: {
      type: 'integer',
      example: '200000',
    },
  },
};

const ErrorResponseSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
      example: 'Nama mitra tidak boleh kosong',
    },
  },
};

const ErrorNotFoundSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
      example: 'Resource / Data tidak ditemukan',
    },
  },
};

module.exports = {
  MitraPayloadSchema,
  MitraResponseSchema,
  ErrorResponseSchema,
  ErrorNotFoundSchema,
  Mitraemail,
  Mitraname,
};
