const routes = (handler) => [
  {
    method: 'POST',
    path: '/skill',
    handler: handler.postSkillHandler,
  },
  {
    method: 'GET',
    path: '/skill',
    handler: handler.getAllSkillHandler,
  },
  {
    method: 'GET',
    path: '/skill/{id}',
    handler: handler.getSkillByIdHandler,
  },
  {
    method: 'PUT',
    path: '/skill/{id}',
    handler: handler.putSkillByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/skill/{id}',
    handler: handler.deleteSkillByIdHandler,
  },
];

module.exports = routes;
