const routes = (handler) => [
  {
    method: 'POST',
    path: '/transport',
    handler: handler.postTransportHandler,
  },
  {
    method: 'GET',
    path: '/transport',
    handler: handler.getAllTransportHandler,
  },
  {
    method: 'DELETE',
    path: '/transport/{id}',
    handler: handler.deleteTransportByIdHandler,
  },
];

module.exports = routes;
