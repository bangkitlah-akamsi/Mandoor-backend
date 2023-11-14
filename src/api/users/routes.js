const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users/{email}',
    handler: handler.getUserByEmailHandler,
  },
  {
    method: 'GET',
    path: '/users/{username}/username',
    handler: handler.getUserByUsernameHandler,
  },
];

module.exports = routes;
