const routes = (handler) => [
  {
    method: 'POST',
    path: '/mitras',
    handler: handler.postMitraHandler,
  },
  {
    method: 'GET',
    path: '/mitras/{email}',
    handler: handler.getMitraByEmailHandler,
  },
  {
    method: 'GET',
    path: '/mitras/{mitraname}/mitraname',
    handler: handler.getMitraByMitranameHandler,
  },
  {
    method: 'GET',
    path: '/mitras/{id}/id',
    handler: handler.getMitraByIdHandler,
  },
  {
    method: 'GET',
    path: '/mitras',
    handler: handler.getMitraHandler,
  },
  {
    method: 'PUT',
    path: '/mitras/{id}',
    handler: handler.putMitraByIdHandler,
  },
];

module.exports = routes;
