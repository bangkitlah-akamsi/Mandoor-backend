const InvariantError = require('../../exceptions/InvariantError');
const { SkillPayloadSchema } = require('./schema');

const SkillValidator = {
  validateSkillPayload: (payload) => {
    const validationResult = SkillPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SkillValidator;
