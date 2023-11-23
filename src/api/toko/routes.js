const routes = (handler) => [
  {
    method: 'POST',
    path: '/toko',
    handler: handler.postTokoHandler,
  },
  {
    method: 'GET',
    path: '/toko/{nama_toko}',
    handler: handler.getTokoByNamaTokoHandler,
  },
  {
    method: 'GET',
    path: '/toko',
    handler: handler.getAllTokoHandler,
  },
  {
    method: 'GET',
    path: '/toko/{id}/id',
    handler: handler.getTokoByIdHandler,
  },
  {
    method: 'PUT',
    path: '/toko/{id}',
    handler: handler.putTokoByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/toko/{id}',
    handler: handler.deleteTokoByIdHandler,
  },
];

module.exports = routes;
