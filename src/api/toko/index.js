const TokoHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'toko',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const tokoHandler = new TokoHandler(service, validator);
    server.route(routes(tokoHandler));
  },
};
