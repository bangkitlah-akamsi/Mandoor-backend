const routes = (handler) => [
  {
    method: 'POST',
    path: '/transport',
    handler: (request, h) => handler.postTransportHandler(request, h),
  },
  {
    method: 'GET',
    path: '/transport',
    handler: () => handler.getAllTransportHandler(),
  },
  {
    method: 'DELETE',
    path: '/transport/{id}',
    handler: (request, h) => handler.deleteTransportByIdHandler(request, h),
  },
];

module.exports = routes;
