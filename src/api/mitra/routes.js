const {
  MitraPayloadSchema,
  MitraResponseSchema,
  ErrorResponseSchema,
  ErrorNotFoundSchema,
  Mitraemail,
  Mitraname,
} = require('../../validator/mitra/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/mitra',
    handler: (request, h) => handler.postMitraHandler(request, h),
    config: {
      description: 'Registration Mitra',
      notes: 'Endpoint untuk melakukan registrasi mitra baru',
      tags: ['api', 'mitra'], // ADD THIS TAG
      validate: {
        payload: MitraPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'Mitra berhasil dibuat',
              schema: MitraResponseSchema,
            },
            // Menambahkan response gagal
            400: {
              description: 'Gagal membuat mitra',
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
    path: '/mitra/{email}',
    handler: (request, h) => handler.getMitraByEmailHandler(request, h),
    config: {
      description: 'Get Mitra by email',
      notes: 'Endpoint untuk mendapatkan data mitra',
      tags: ['api', 'mitra'], // ADD THIS TAG
      validate: {
        params: Mitraemail,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'Mitra data',
              schema: MitraResponseSchema,
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
    path: '/mitra/{mitraname}/mitraname',
    handler: (request, h) => handler.getMitraByMitranameHandler(request, h),
    config: {
      description: 'Get Mitra by mitraname',
      notes: 'Endpoint untuk mendapatkan data mitra berdasarkan mitraname',
      tags: ['api', 'mitra'], // ADD THIS TAG
      validate: {
        params: Mitraname,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'Mitra data',
              schema: MitraResponseSchema,
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
    path: '/mitra/{id}/id',
    handler: (request, h) => handler.getMitraByIdHandler(request, h),
  },
  {
    method: 'GET',
    path: '/mitras',
    handler: () => handler.getMitraHandler(),
  },
  {
    method: 'PUT',
    path: '/mitra/{id}',
    handler: (request, h) => handler.putMitraByIdHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/mitra/{id}',
    handler: (request, h) => handler.deleteMitraByIdHandler(request, h),
  },
];

module.exports = routes;
