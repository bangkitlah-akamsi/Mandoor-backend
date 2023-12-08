const InvariantError = require('../../exceptions/InvariantError');
const { GambarHeadersSchema } = require('./schema');

const UploadsValidator = {
  validateGambarHeaders: (headers) => {
    const validationResult = GambarHeadersSchema.validate(headers);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UploadsValidator;
