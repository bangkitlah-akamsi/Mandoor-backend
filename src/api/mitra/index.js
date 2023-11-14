const MitrasHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'mitras',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const mitrasHandler = new MitrasHandler(service, validator);
    server.route(routes(mitrasHandler));
  },
};
