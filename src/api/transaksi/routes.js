const routes = (handler) => [
  {
    method: 'GET',
    path: '/transaksi',
    handler: () => handler.getAllTransaksiHandler(),
  },
  {
    method: 'GET',
    path: '/transaksi/user/{user_id}',
    handler: (request, h) => handler.getTransaksiByUserIdHandler(request, h),
  },
  {
    method: 'GET',
    path: '/transaksi/mitra/{mitra_id}',
    handler: (request, h) => handler.getTransaksiByMitraIdHandler(request, h),
  },
  {
    method: 'GET',
    path: '/transaksi/{id}',
    handler: (request, h) => handler.getTransaksiByIdHandler(request, h),
  },
];

module.exports = routes;
