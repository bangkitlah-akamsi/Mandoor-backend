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
];

module.exports = routes;
