const TokenizerSnapHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'tokensnap',
  version: '1.0.0',
  register: async (server, { service }) => {
    const tokenizersnapHandler = new TokenizerSnapHandler(service);
    server.route(routes(tokenizersnapHandler));
  },
};
