const routes = (handler) => [
  {
    method: 'POST',
    path: '/user',
    handler: (request, h) => handler.postUserHandler(request, h),
  },
  {
    method: 'GET',
    path: '/users',
    handler: () => handler.getAllUsersHandler(),
  },
  {
    method: 'GET',
    path: '/user/{email}',
    handler: (request, h) => handler.getUserByEmailHandler(request, h),
  },
  {
    method: 'GET',
    path: '/user/{username}/username',
    handler: (request, h) => handler.getUserByUsernameHandler(request, h),
  },
  {
    method: 'GET',
    path: '/user/{id}/id',
    handler: (request, h) => handler.getUserByIdHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/user/{id}',
    handler: (request, h) => handler.putUserByIdHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    handler: (request, h) => handler.deleteUserByIdHandler(request, h),
  },
];

module.exports = routes;
