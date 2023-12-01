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

// Pesanan
const pesanan = require('./api/pesanan');
const PesananService = require('./services/postgres/PesananService');
const PesanValidator = require('./validator/pesan');

// Skill
const skill = require('./api/skill');
const SkillService = require('./services/postgres/SkillService');
const SkillValidator = require('./validator/skill');

// Skill
const transport = require('./api/transport');
const TransportService = require('./services/postgres/TransportService');
const TransportValidator = require('./validator/transport');

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
  const pesanService = new PesananService();
  const skillService = new SkillService();
  const transportService = new TransportService();

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
    {
      plugin: pesanan,
      options: {
        service: pesanService,
        validator: PesanValidator,
      },
    },
    {
      plugin: skill,
      options: {
        service: skillService,
        validator: SkillValidator,
      },
    },
    {
      plugin: transport,
      options: {
        service: transportService,
        validator: TransportValidator,
      },
    },
  ]);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
