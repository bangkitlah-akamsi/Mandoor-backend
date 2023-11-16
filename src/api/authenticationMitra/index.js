const AuthenticationsMitraHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications_mitras',
  version: '1.0.0',
  register: async (server, {
    authenticationsMitraService,
    mitrasService,
    tokenManager,
    validator,
  }) => {
    const authenticationsMitraHandler = new AuthenticationsMitraHandler(
      authenticationsMitraService,
      mitrasService,
      tokenManager,
      validator,
    );
    server.route(routes(authenticationsMitraHandler));
  },
};
