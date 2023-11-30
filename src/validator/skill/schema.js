const Joi = require('joi');

const SkillPayloadSchema = Joi.object({
  nama_skill: Joi.string().required(),
  harga_skill: Joi.number().required(),
  hitungan: Joi.string().required(),
});

module.exports = { SkillPayloadSchema };
