const routes = (handler) => [
  {
    method: 'POST',
    path: '/skill',
    handler: (request, h) => handler.postSkillHandler(request, h),
  },
  {
    method: 'GET',
    path: '/skill',
    handler: () => handler.getAllSkillHandler(),
  },
  {
    method: 'GET',
    path: '/skill/{id}',
    handler: (request, h) => handler.getSkillByIdHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/skill/{id}',
    handler: (request, h) => handler.putSkillByIdHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/skill/{id}',
    handler: (request, h) => handler.deleteSkillByIdHandler(request, h),
  },
];

module.exports = routes;