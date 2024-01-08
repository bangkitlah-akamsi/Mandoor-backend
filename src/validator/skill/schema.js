const Joi = require('joi');

const SkillPayloadSchema = Joi.object({
  nama_skill: Joi.string().required(),
  harga_skill: Joi.number().required(),
  hitungan: Joi.string().required(),
  kata: Joi.string().required(),
});

const getskillschema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      example: 'SUCCESS',
    },
    skills: {
      type: 'array',
      example: [
        {
          id: 'skill-DRxnaZ_DnBEZUUVP',
          nama_skill: 'Perbaikan Plafon',
          harga_skill: 150000,
          hitungan: 'meter',
        },
        {
          id: 'skill-I8EUMrIIl8P7p4hR',
          nama_skill: 'Perbaikan atap',
          harga_skill: 50000,
          hitungan: 'meter',
        },
        {
          id: 'skill-6IJkjMKm7cCCOidd',
          nama_skill: 'Pemasangan Lantai Kayu',
          harga_skill: 200000,
          hitungan: 'meter',
        },
      ],
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

module.exports = { SkillPayloadSchema, getskillschema, ErrorNotFoundSchema };
