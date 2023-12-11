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
    path: '/item',
    handler: () => handler.getAllItemHandler(),
  },
  {
    method: 'GET',
    path: '/skill/{id}',
    handler: (request, h) => handler.getSkillByIdHandler(request, h),
  },
  {
    method: 'GET',
    path: '/tukang/{item}',
    handler: (request, h) => handler.getSkillByItemHandler(request, h),
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
  {
    method: 'DELETE',
    path: '/item/{id}',
    handler: (request, h) => handler.deleteItemByIdHandler(request, h),
  },
];

module.exports = routes;
