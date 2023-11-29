const routes = (handler) => [
  {
    method: 'POST',
    path: '/pesananuser',
    handler: handler.postPesananHandler,
  },
  {
    method: 'GET',
    path: '/pesanan',
    handler: handler.getAllPesananHandler,
  },
  {
    method: 'GET',
    path: '/pesanan/{id}',
    handler: handler.getPesananByIdHandler,
  },
  {
    method: 'PUT',
    path: '/pesananmitra',
    handler: handler.acceptPesananForMitra,
  },
  {
    method: 'PUT',
    path: '/pesananmitra/{mitra_id}',
    handler: handler.endedPesananByMitra,
  },
  {
    method: 'DELETE',
    path: '/pesanan/{mitra_id}',
    handler: handler.endedPesananByMitra,
  },
];

module.exports = routes;
