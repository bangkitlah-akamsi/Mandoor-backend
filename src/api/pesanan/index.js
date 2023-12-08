const PesananHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'pesanan',
  version: '1.0.0',
  register: async (server, {
    service, storageService, validator, UploadsValidator,
  }) => {
    const pesananHandler = new PesananHandler(service, storageService, validator, UploadsValidator);
    server.route(routes(pesananHandler));
  },
};
