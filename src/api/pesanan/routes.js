const {
  AcceptedPesanPayloadSchema,
  ErrorNotFoundSchema,
  ErrorResponseSchema,
  MitraId,
  UserId,
  PesananResponseSchema,
  PesanSchema,
  AcceptedResponseSchema,
  idpesanan,
  getPesananByskillschema,
  getSnapTokenResponse,
  cancelPesanan,
  completePesanan,
} = require('../../validator/pesan/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/pesananuser',
    handler: (request, h) => handler.postPesananHandler(request, h),
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 5242880, // 5 mb
      },
      description: 'Registration User',
      notes: 'Endpoint untuk melakukan registrasi user baru',
      tags: ['api', 'pesanan'], // ADD THIS TAG
      validate: {
        payload: PesanSchema,
      },
      plugins: {
        'hapi-swagger': {
          consumes: ['multipart/form-data'],
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'Pesanan berhasil dibuat',
              schema: PesananResponseSchema,
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
    path: '/pesanan',
    handler: () => handler.getAllPesananHandler(),
  },
  {
    method: 'GET',
    path: '/pesanan/{id}',
    handler: (request, h) => handler.getPesananByIdHandler(request, h),
    config: {
      description: 'Get Pesanan By Id Pesanan',
      notes: 'Endpoint untuk mendapatkan data pesanan berdasarkan id pesanan',
      tags: ['api', 'pesanan'], // ADD THIS TAG
      validate: {
        params: idpesanan,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'Pesanan data',
              schema: PesananResponseSchema,
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
    path: '/pesanan/user/{user_id}',
    handler: (request, h) => handler.getPesananByUserIdHandler(request, h),
    config: {
      description: 'Get Pesanan By user id',
      notes: 'Endpoint untuk mendapatkan data pesanan berdasarkan user id',
      tags: ['api', 'user'], // ADD THIS TAG
      validate: {
        params: UserId,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'Pesanan data',
              schema: PesananResponseSchema,
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
    path: '/pesanan/mitra/{mitra_id}',
    handler: (request, h) => handler.getPesananByMitraIdHandler(request, h),
    config: {
      description: 'Get Pesanan By Mitra Id',
      notes: 'Endpoint untuk mendapatkan data yang telah diambil mitra',
      tags: ['api', 'mitra'], // ADD THIS TAG
      validate: {
        params: MitraId,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'Pesanan data',
              schema: AcceptedResponseSchema,
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
    path: '/pesanan/skill/{mitra_id}',
    handler: (request, h) => handler.getPesananBySkillMitraIdHandler(request, h),
    config: {
      description: 'Get Pesanan order by skill mitra',
      notes: 'Endpoint untuk pesanan berdasarkan skill / kemampuan mitra',
      tags: ['api', 'mitra'], // ADD THIS TAG
      validate: {
        params: MitraId,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'pesanan data by skill',
              schema: getPesananByskillschema,
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
    method: 'PUT',
    path: '/pesananmitra',
    handler: (request, h) => handler.acceptPesananForMitra(request, h),
    config: {
      description: 'Accepted pesanan',
      notes: 'Endpoint untuk mitra ketika accepted pesanan dari user',
      tags: ['api', 'mitra'], // ADD THIS TAG
      validate: {
        payload: AcceptedPesanPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'Pesanan data',
              schema: AcceptedResponseSchema,
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
    method: 'PUT',
    path: '/pesanan/payment/{pesanan_id}',
    handler: (request, h) => handler.payPesananForUser(request, h),
    config: {
      description: 'Payment pesanan, get snap token',
      notes: 'Endpoint untuk meminta snap token payment gateway',
      tags: ['api', 'pesanan'], // ADD THIS TAG
      validate: {
        params: idpesanan,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'Token Snap',
              schema: getSnapTokenResponse,
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
    method: 'DELETE',
    path: '/pesananmitra/{mitra_id}',
    handler: (request, h) => handler.endedPesananByMitra(request, h),
    config: {
      description: 'End or Cancel pesanan by mitra',
      notes: 'Endpoint untuk menyelesaikan atau membatalkan pesanan',
      tags: ['api', 'pesanan'], // ADD THIS TAG
      validate: {
        params: MitraId,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            // Menambahkan response sukses
            200: {
              description: 'Pesanan status',
              schema: completePesanan,
            },
            402: {
              description: 'Pesanan dibatalkan',
              schema: cancelPesanan,
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
];

module.exports = routes;
