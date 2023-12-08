const ClientError = require('../../exceptions/ClientError');

class PesananHandler {
  constructor(service, storageService, validator, UploadsValidator) {
    this._service = service;
    this._storageService = storageService;
    this._validator = validator;
    this._UploadsValidator = UploadsValidator;
  }

  async postPesananHandler(request, h) {
    try {
      const { gambar = 'kosong' } = request.payload;

      const {
        user_id, kecamatan_user, kota_user, alamat, skill,
      } = request.payload;

      this._validator.validatePesanPayload({
        user_id, kecamatan_user, kota_user, alamat, skill,
      });
      this._UploadsValidator.validateGambarHeaders(gambar.hapi.headers);

      const skillArray = JSON.parse(skill);
      console.log(skillArray);
      console.log(typeof (skillArray));

      const filename = await this._storageService.writeFile(gambar, gambar.hapi);
      const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/uploadGambar/gambar/${filename}`;
      const pesan = await this._service.addPesanan({
        user_id, kecamatan_user, kota_user, alamat, skillArray, fileLocation,
      });

      const response = h.response({
        status: 'success',
        message: 'Pesanan berhasil dibuat',
        data: pesan,
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getAllPesananHandler() {
    // to do : validation credential admin
    const Pesanan = await this._service.getAllPesanan();
    return {
      status: 'success',
      data: {
        Pesanan,
      },
    };
  }

  async getPesananByIdHandler(request) {
    const { id } = request.params;

    const pesanan = await this._service.getPesananById(id);

    return {
      status: 'success',
      data: {
        pesanan,
      },
    };
  }

  // todo get pesanan by user id
  async getPesananByUserIdHandler(request) {
    const { user_id } = request.params;

    const pesanan = await this._service.getPesananByUserId(user_id);

    return {
      status: 'success',
      data: {
        pesanan,
      },
    };
  }

  // todo get pesanan by mitra id

  async getPesananByMitraIdHandler(request) {
    const { mitra_id } = request.params;

    const pesanan = await this._service.getPesananByMitraId(mitra_id);

    return {
      status: 'success',
      data: {
        pesanan,
      },
    };
  }

  // todo get pesanan by skill_id

  async acceptPesananForMitra(request, h) {
    try {
      this._validator.validateAcceptedPesanPayload(request.payload);

      const { pesanan_id, mitra_id, barang } = request.payload;

      const result = await this._service.editPesananById({ pesanan_id, mitra_id, barang });

      const response = h.response({
        status: 'success',
        message: result,
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async endedPesananByMitra(request, h) {
    const { mitra_id } = request.params;

    const result = await this._service.endedPesananByMitraId(mitra_id);
    const response = h.response({
      status: 'success',
      message: result,
    });
    response.code(200);
    return response;
  }

  async getPesananBySkillMitraIdHandler(request) {
    const { mitra_id } = request.params;

    const dataPesanan = await this._service.getPesananByMitraSkillId(mitra_id);
    return {
      status: 'success',
      data: {
        dataPesanan,
      },
    };
  }

  async payPesananForUser(request, h) {
    try {
      const { pesanan_id } = request.params;

      const saldo = await this._service.editSaldoMitraById(pesanan_id);
      console.log(saldo);
      const dataPesanan = await this._service.payPesanan(pesanan_id);
      return {
        status: 'success',
        data: {
          dataPesanan,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = PesananHandler;
