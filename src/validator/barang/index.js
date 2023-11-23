const InvariantError = require('../../exceptions/InvariantError');
const { BarangPayloadSchema } = require('./schema');

const BarangValidator = {
  validateBarangPayload: (payload) => {
    const validationResult = BarangPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = BarangValidator;
