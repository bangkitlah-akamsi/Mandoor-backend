const TransportHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'transport',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const transportHandler = new TransportHandler(service, validator);
    server.route(routes(transportHandler));
  },
};
