const routes = (handler) => [
  {
    method: 'POST',
    path: '/pesananuser',
    handler: (request, h) => handler.postPesananHandler(request, h),
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
    method: 'PUT',
    path: '/pesananmitra',
    handler: (request, h) => handler.acceptPesananForMitra(request, h),
  },
  {
    method: 'PUT',
    path: '/pesananmitra/{mitra_id}',
    handler: (request, h) => handler.endedPesananByMitra(request, h),
  },
  {
    method: 'DELETE',
    path: '/pesanan/{mitra_id}',
    handler: (request, h) => handler.endedPesananByMitra(request, h),
  },
];

module.exports = routes;
