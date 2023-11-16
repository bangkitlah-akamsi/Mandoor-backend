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

// Authentications-Users
const authenticationsusers = require('./api/authenticationUsers');
const AuthenticationsUserService = require('./services/postgres/AuthenticationsUserService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/Authentications');

// Authentications-Mitra
const authenticationsmitras = require('./api/authenticationMitra');
const AuthenticationsMitraService = require('./services/postgres/AuthenticationsMitraService');

const init = async () => {
  const usersService = new UsersService();
  const mitrasService = new MitrasService();
  const authenticationsUserService = new AuthenticationsUserService();
  const authenticationsMitraService = new AuthenticationsMitraService();

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
        authenticationsUserService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: authenticationsmitras,
      options: {
        authenticationsMitraService,
        mitrasService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
