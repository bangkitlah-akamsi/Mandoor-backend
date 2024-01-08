const Joi = require('joi');

const PesanPayloadSchema = Joi.object({
  user_id: Joi.string().required(),
  kecamatan_user: Joi.string().required(),
  kota_user: Joi.string().required(),
  alamat: Joi.string().required(),
  skill: Joi.string().required(),
});

const PesanSchema = Joi.object({
  user_id: Joi.string().required(),
  kecamatan_user: Joi.string().required(),
  kota_user: Joi.string().required(),
  alamat: Joi.string().required(),
  skill: Joi.string().required(),
  imageurl: Joi.string().required(),
});

const AcceptedPesanPayloadSchema = Joi.object({
  pesanan_id: Joi.string().required(),
  mitra_id: Joi.string().required(),
  barang: Joi.array(),
});

const UserId = Joi.object({
  user_id: Joi.string().required(),
});

const idpesanan = Joi.object({
  id: Joi.string().required(),
});

const MitraId = Joi.object({
  mitra_id: Joi.string().required(),
});

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

const PesananResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'p-001',
    },
    nama: {
      type: 'integer',
      example: 1,
    },
    kecamatan_user: {
      type: 'string',
      example: 'Laweyan',
    },
    kota_user: {
      type: 'string',
      example: 'Surakarta',
    },
    alamat: {
      type: 'string',
      example: 'Solo',
    },
    skill: {
      type: 'string',
      example: '[[tukang kayu, 2 meter]]',
    },
    mitra_id: {
      type: 'string',
      example: 'null',
    },
    kecamatan_mitra: {
      type: 'string',
      example: 'null',
    },
    kota_mitra: {
      type: 'string',
      example: 'null',
    },
    harga_skill: {
      type: 'integer',
      example: '250000',
    },
    transport: {
      type: 'string',
      example: 'null',
    },
    total: {
      type: 'string',
      example: 'null',
    },
    status_order: {
      type: 'string',
      example: 'search mitra',
    },
    waktu: {
      type: 'string',
      example: '2023-12-09T01:34:23.011Z',
    },
    nomorwa_user: {
      type: 'string',
      example: '08233445433321',
    },
    nomorwa_mitra: {
      type: 'string',
      example: 'null',
    },
    imageurl: {
      type: 'string',
      example: 'http://storage.googleapis.com/pintu.jpg',
    },
  },
};

const getPesananByskillschema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      example: 'SUCCESS',
    },
    message: {
      type: 'array',
      example: [PesananResponseSchema],
    },
  },
};

const completePesanan = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      example: 'SUCCESS',
    },
    message: {
      type: 'string',
      example: 'pesanan telah diselesaikan',
    },
  },
};

const cancelPesanan = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      example: 'SUCCESS',
    },
    message: {
      type: 'string',
      example: 'pesanan telah dibatalkan',
    },
  },
};

const getSnapTokenResponse = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      example: 'SUCCESS',
    },
    message: {
      type: 'string',
      example: 'token berhasil dibuat',
    },
    token: {
      type: 'string',
      example: 'rahasia-asdjadnajdnkadmsaklsdmaks',
    },
  },
};

const AcceptedResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'p-001',
    },
    nama: {
      type: 'integer',
      example: 1,
    },
    kecamatan_user: {
      type: 'string',
      example: 'Laweyan',
    },
    kota_user: {
      type: 'string',
      example: 'Surakarta',
    },
    alamat: {
      type: 'string',
      example: 'Solo',
    },
    skill: {
      type: 'string',
      example: '[[tukang kayu, 2 meter]]',
    },
    mitra_id: {
      type: 'integer',
      example: 2,
    },
    kecamatan_mitra: {
      type: 'string',
      example: 'Serengan',
    },
    kota_mitra: {
      type: 'string',
      example: 'Surakarta',
    },
    harga_skill: {
      type: 'integer',
      example: '250000',
    },
    transport: {
      type: 'integer',
      example: 10600,
    },
    total_barang: {
      type: 'integer',
      example: 14000,
    },
    total: {
      type: 'integer',
      example: 274600,
    },
    status_order: {
      type: 'string',
      example: 'wait payment',
    },
    waktu: {
      type: 'string',
      example: '2023-12-09T01:34:23.011Z',
    },
    nomorwa_user: {
      type: 'string',
      example: '08233445433321',
    },
    nomorwa_mitra: {
      type: 'string',
      example: '0988652200662',
    },
    imageurl: {
      type: 'string',
      example: 'http://storage.googleapis.com/pintu.jpg',
    },
  },
};

module.exports = {
  PesanPayloadSchema,
  AcceptedPesanPayloadSchema,
  ErrorNotFoundSchema,
  ErrorResponseSchema,
  UserId,
  MitraId,
  PesananResponseSchema,
  AcceptedResponseSchema,
  PesanSchema,
  idpesanan,
  getPesananByskillschema,
  getSnapTokenResponse,
  cancelPesanan,
  completePesanan,
};
