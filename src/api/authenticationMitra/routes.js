const routes = (handler) => [
  {
    method: 'POST',
    path: '/mitrasauthentications',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/mitrasauthentications',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/mitrasauthentications',
    handler: handler.deleteAuthenticationHandler,
  },
];

module.exports = routes;
