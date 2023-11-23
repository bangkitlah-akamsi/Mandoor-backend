const routes = (handler) => [
  {
    method: 'POST',
    path: '/barang',
    handler: handler.postBarangHandler,
  },
  {
    method: 'GET',
    path: '/barang/{nama_barang}',
    handler: handler.getBarangByNamaBarangHandler,
  },
  {
    method: 'GET',
    path: '/barang',
    handler: handler.getAllBarangHandler,
  },
  {
    method: 'GET',
    path: '/barang/{id}/id',
    handler: handler.getBarangByIdHandler,
  },
  {
    method: 'GET',
    path: '/barang/{toko_id}/tokoid',
    handler: handler.getBarangByIdTokoHandler,
  },
  {
    method: 'GET',
    path: '/barang/{nama_toko}/namatoko',
    handler: handler.getBarangByNamaTokoHandler,
  },
  {
    method: 'PUT',
    path: '/barang/{id}',
    handler: handler.putBarangByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/barang/{id}',
    handler: handler.deleteBarangByIdHandler,
  },
];

module.exports = routes;
