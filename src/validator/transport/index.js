const InvariantError = require('../../exceptions/InvariantError');
const { TransportPayloadSchema } = require('./schema');

const TransportValidator = {
  validateTransportPayload: (payload) => {
    const validationResult = TransportPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = TransportValidator;
