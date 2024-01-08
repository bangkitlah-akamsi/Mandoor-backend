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
    path: '/mitrasauthentications',
    handler: (request, h) => handler.postAuthenticationHandler(request, h),
    config: {
      description: 'Login Mitra',
      notes: 'Endpoint untuk melakukan Login Mitra',
      tags: ['api', 'auth'], // ADD THIS TAG
      validate: {
        payload: PostAuthenticationPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'Mitra berhasil login',
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
    path: '/mitrasauthentications',
    handler: (request, h) => handler.putAuthenticationHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/mitrasauthentications',
    handler: (request, h) => handler.deleteAuthenticationHandler(request, h),
    config: {
      description: 'Logout Mitra',
      notes: 'Endpoint untuk melakukan logout mitra',
      tags: ['api', 'auth'], // ADD THIS TAG
      validate: {
        payload: DeleteAuthenticationPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'Mitra berhasil logout',
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
