const PesananHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'pesanan',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const pesananHandler = new PesananHandler(service, validator);
    server.route(routes(pesananHandler));
  },
};
