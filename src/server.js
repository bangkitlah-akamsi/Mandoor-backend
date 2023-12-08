require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const path = require('path');
const ClientError = require('./exceptions/ClientError');

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

// Transport
const transport = require('./api/transport');
const TransportService = require('./services/postgres/TransportService');
const TransportValidator = require('./validator/transport');

// Transaksi
const transaksi = require('./api/transaksi');
const TransaksiService = require('./services/postgres/TransaksiService');

// Token Snap
const tokensnap = require('./api/tokenizerSnap');

// storage
const StorageService = require('./services/storage/StorageService');
const UploadsValidator = require('./validator/uploads');

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
  const pesanService = new PesananService(mitrasService);
  const skillService = new SkillService();
  const transportService = new TransportService();
  const transaksiService = new TransaksiService();
  const storageService = new StorageService(path.resolve(__dirname, 'api/pesanan/file/gambar'));

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Inert,
    },
  ]);

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
        storageService,
        validator: PesanValidator,
        UploadsValidator,
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
    {
      plugin: transaksi,
      options: {
        service: transaksiService,
      },
    },
    {
      plugin: tokensnap,
      options: {
        service: pesanService,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;
    if (response instanceof Error) {
      // penanganan client error secara internal.
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue;
      }
      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }
    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
