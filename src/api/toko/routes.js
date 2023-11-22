const routes = (handler) => [
  {
    method: 'POST',
    path: '/toko',
    handler: handler.addTokoHandler,
  },
  {
    method: 'GET',
    path: '/toko/{nama_toko}',
    handler: handler.getTokoByNamaTokoHandler,
  },
  {
    method: 'GET',
    path: '/toko',
    handler: handler.getTokoHandler,
  },
  {
    method: 'GET',
    path: '/toko/{id}/id',
    handler: handler.getTokoByIdHandler,
  },
  {
    method: 'PUT',
    path: '/toko/{id}',
    handler: handler.editTokoByIdHandler,
  },
  {
    method: 'PUT',
    path: '/toko/{id}/profile',
    handler: handler.editProfileTokoByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/toko/{id}',
    handler: handler.deleteTokoByIdHandler,
  },
];

module.exports = routes;
