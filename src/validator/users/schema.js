const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required(),
  nomorwa: Joi.string().required(),
  alamat: Joi.string().required(),
});

const Useremail = Joi.object({
  email: Joi.string().required(),
});

const Username = Joi.object({
  username: Joi.string().required(),
});

const UserResponseSchema = {
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
  UserPayloadSchema,
  Useremail,
  Username,
  UserResponseSchema,
  ErrorNotFoundSchema,
  ErrorResponseSchema,
};
