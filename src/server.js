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

const init = async () => {
  const usersService = new UsersService();
  const mitrasService = new MitrasService();

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
  ]);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
