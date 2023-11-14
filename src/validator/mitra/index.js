const InvariantError = require('../../exceptions/InvariantError');
const { MitraPayloadSchema } = require('./schema');

const MitrasValidator = {
  validateMitraPayload: (payload) => {
    const validationResult = MitraPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = MitrasValidator;
