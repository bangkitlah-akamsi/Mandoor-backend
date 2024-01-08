const {
  PostAuthenticationPayloadSchema,
  logoutMitraResponse,
  DeleteAuthenticationPayloadSchema,
  ErrorResponseSchema,
  authMitraResponse,
} = require('../../validator/Authentications/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: (request, h) => handler.postAuthenticationHandler(request, h),
    config: {
      description: 'Login User',
      notes: 'Endpoint untuk melakukan Login User',
      tags: ['api', 'auth'], // ADD THIS TAG
      validate: {
        payload: PostAuthenticationPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'User berhasil login',
              schema: authMitraResponse,
            },
            404: {
              description: 'Data tidak ditemukan',
              schema: ErrorResponseSchema,
            },
          },
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: (request, h) => handler.putAuthenticationHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: (request, h) => handler.deleteAuthenticationHandler(request, h),
    config: {
      description: 'Logout User',
      notes: 'Endpoint untuk melakukan logout User',
      tags: ['api', 'auth'], // ADD THIS TAG
      validate: {
        payload: DeleteAuthenticationPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'User berhasil logout',
              schema: logoutMitraResponse,
            },
            404: {
              description: 'Data tidak ditemukan',
              schema: ErrorResponseSchema,
            },
          },
        },
      },
    },
  },
];

module.exports = routes;
