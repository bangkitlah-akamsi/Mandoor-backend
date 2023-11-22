const InvariantError = require('../../exceptions/InvariantError');
const { TokoPayloadSchema } = require('./schema');

const TokoValidator = {
  validateTokoPayload: (payload) => {
    const validationResult = TokoPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = TokoValidator;
