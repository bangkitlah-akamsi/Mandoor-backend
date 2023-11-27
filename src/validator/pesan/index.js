const InvariantError = require('../../exceptions/InvariantError');
const { PesanPayloadSchema } = require('./schema');
const { AcceptedPesanPayloadSchema } = require('./schema');

const PesanValidator = {
  validatePesanPayload: (payload) => {
    const validationResult = PesanPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateAcceptedPesanPayload: (payload) => {
    const validationResult = AcceptedPesanPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PesanValidator;
