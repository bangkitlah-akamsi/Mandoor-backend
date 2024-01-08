const {
  UserPayloadSchema,
  Useremail,
  Username,
  UserResponseSchema,
  ErrorNotFoundSchema,
  ErrorResponseSchema,
} = require('../../validator/users/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/user',
    handler: (request, h) => handler.postUserHandler(request, h),
    config: {
      description: 'Registration User',
      notes: 'Endpoint untuk melakukan registrasi user baru',
      tags: ['api', 'user'], // ADD THIS TAG
      validate: {
        payload: UserPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'User berhasil dibuat',
              schema: UserResponseSchema,
            },
            // Menambahkan response gagal
            400: {
              description: 'Gagal membuat user',
              schema: ErrorResponseSchema,
            },
            404: {
              description: 'Data tidak ditemukan',
              schema: ErrorNotFoundSchema,
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: () => handler.getAllUsersHandler(),
  },
  {
    method: 'GET',
    path: '/user/{email}',
    handler: (request, h) => handler.getUserByEmailHandler(request, h),
    config: {
      description: 'Get User By Email',
      notes: 'Endpoint untuk mendapatkan data User',
      tags: ['api', 'user'], // ADD THIS TAG
      validate: {
        params: Useremail,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'User data',
              schema: UserResponseSchema,
            },
            404: {
              description: 'Data tidak ditemukan',
              schema: ErrorNotFoundSchema,
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/user/{username}/username',
    handler: (request, h) => handler.getUserByUsernameHandler(request, h),
    config: {
      description: 'Get User by username',
      notes: 'Endpoint untuk mendapatkan data user',
      tags: ['api', 'mitra'], // ADD THIS TAG
      validate: {
        params: Username,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'User data',
              schema: UserResponseSchema,
            },
            404: {
              description: 'Data tidak ditemukan',
              schema: ErrorNotFoundSchema,
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/user/{id}/id',
    handler: (request, h) => handler.getUserByIdHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/user/{id}',
    handler: (request, h) => handler.putUserByIdHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    handler: (request, h) => handler.deleteUserByIdHandler(request, h),
  },
];

module.exports = routes;
