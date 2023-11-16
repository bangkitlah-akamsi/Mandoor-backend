require('dotenv').config();

const Hapi = require('@hapi/hapi');
// const path = require('path');

// Users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

// Mitras
const mitras = require('./api/mitra');
const MitrasService = require('./services/postgres/MitrasService');
const MitrasValidator = require('./validator/mitra');

// Authentications
const authenticationsusers = require('./api/authenticationUsers');
const AuthenticationsUserService = require('./services/postgres/AuthenticationsUserService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/Authentications');

const init = async () => {
  const usersService = new UsersService();
  const mitrasService = new MitrasService();
  const authenticationsService = new AuthenticationsUserService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: mitras,
      options: {
        service: mitrasService,
        validator: MitrasValidator,
      },
    },
    {
      plugin: authenticationsusers,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
