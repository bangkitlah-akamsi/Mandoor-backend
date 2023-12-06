const ClientError = require('../../exceptions/ClientError');

class PesananHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postPesananHandler(request, h) {
    this._validator.validatePesanPayload(request.payload);

    const {
      user_id, kecamatan_user, kota_user, alamat, skill,
    } = request.payload;

    const pesan = await this._service.addPesanan({
      user_id, kecamatan_user, kota_user, alamat, skill,
    });
    console.log(pesan);

    const response = h.response({
      status: 'success',
      message: 'Pesanan berhasil dibuat',
      data: pesan,
    });
    response.code(201);
    return response;
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

  // todo get pesanan by mitra id

  // todo get pesanan by skill_id

  async acceptPesananForMitra(request, h) {
    this._validator.validateAcceptedPesanPayload(request.payload);

    const { pesanan_id, mitra_id, barang } = request.payload;

    const result = await this._service.editPesananById({ pesanan_id, mitra_id, barang });

    const response = h.response({
      status: 'success',
      message: result,
    });
    response.code(200);
    return response;
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

  async getPesananBySkillMitraId(request) {
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
