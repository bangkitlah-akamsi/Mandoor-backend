const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications_users',
  version: '1.0.0',
  register: async (server, {
    authenticationsUserService,
    usersService,
    tokenManager,
    validator,
  }) => {
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsUserService,
      usersService,
      tokenManager,
      validator,
    );
    server.route(routes(authenticationsHandler));
  },
};
