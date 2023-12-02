const TransaksiHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'transaksi',
  version: '1.0.0',
  register: async (server, { service }) => {
    const transaksiHandler = new TransaksiHandler(service);
    server.route(routes(transaksiHandler));
  },
};
