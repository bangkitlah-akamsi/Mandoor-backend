const SkillHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'skill',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const skillHandler = new SkillHandler(service, validator);
    server.route(routes(skillHandler));
  },
};
