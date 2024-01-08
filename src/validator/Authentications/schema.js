const Joi = require('joi');

const PostAuthenticationPayloadSchema = Joi.object({
  // username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const PutAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const DeleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const authMitraResponse = {
  type: 'object',
  properties: {
    STATUS: {
      type: 'string',
      example: 'SUCCESS',
    },
    token: {
      type: 'string',
      example: 'asdadjnqw78h3jnkwd7823n2323r',
    },
  },
};

const logoutMitraResponse = {
  type: 'object',
  properties: {
    STATUS: {
      type: 'string',
      example: 'SUCCESS',
    },
    message: {
      type: 'string',
      example: 'berhasil logout',
    },
  },
};

const ErrorResponseSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
      example: 'Nama tidak boleh kosong',
    },
  },
};

module.exports = {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
  ErrorResponseSchema,
  authMitraResponse,
  logoutMitraResponse,
};
