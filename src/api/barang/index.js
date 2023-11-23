const BarangHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'barang',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const barangHandler = new BarangHandler(service, validator);
    server.route(routes(barangHandler));
  },
};
