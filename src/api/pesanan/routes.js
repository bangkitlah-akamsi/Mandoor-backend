const path = require('path');

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
        maxBytes: 512000, // 512KB
      },
    },
  },
  {
    method: 'GET',
    path: '/uploadGambar/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
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
  },
  {
    method: 'GET',
    path: '/pesanan/user/{user_id}',
    handler: (request, h) => handler.getPesananByUserIdHandler(request, h),
  },
  {
    method: 'GET',
    path: '/pesanan/mitra/{mitra_id}',
    handler: (request, h) => handler.getPesananByMitraIdHandler(request, h),
  },
  {
    method: 'GET',
    path: '/pesanan/skill/{mitra_id}',
    handler: (request, h) => handler.getPesananBySkillMitraIdHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/pesananmitra',
    handler: (request, h) => handler.acceptPesananForMitra(request, h),
  },
  {
    method: 'PUT',
    path: '/pesanan/payment/{pesanan_id}',
    handler: (request, h) => handler.payPesananForUser(request, h),
  },
  {
    method: 'DELETE',
    path: '/pesananmitra/{mitra_id}',
    handler: (request, h) => handler.endedPesananByMitra(request, h),
  },
];

module.exports = routes;
