const routes = (handler) => [
  {
    method: 'POST',
    path: '/mitra',
    handler: (request, h) => handler.postMitraHandler(request, h),
  },
  {
    method: 'GET',
    path: '/mitra/{email}',
    handler: (request, h) => handler.getMitraByEmailHandler(request, h),
  },
  {
    method: 'GET',
    path: '/mitra/{mitraname}/mitraname',
    handler: (request, h) => handler.getMitraByMitranameHandler(request, h),
  },
  {
    method: 'GET',
    path: '/mitra/{id}/id',
    handler: (request, h) => handler.getMitraByIdHandler(request, h),
  },
  {
    method: 'GET',
    path: '/mitras',
    handler: () => handler.getMitraHandler(),
  },
  {
    method: 'PUT',
    path: '/mitra/{id}',
    handler: (request, h) => handler.putMitraByIdHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/mitra/{id}',
    handler: (request, h) => handler.deleteMitraByIdHandler(request, h),
  },
];

module.exports = routes;
