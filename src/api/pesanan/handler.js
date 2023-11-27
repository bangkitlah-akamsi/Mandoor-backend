const ClientError = require('../../exceptions/ClientError');

class PesananHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPesananHandler = this.postPesananHandler.bind(this);
    this.getPesananByIdHandler = this.getPesananByIdHandler.bind(this);
    this.getAllPesananHandler = this.getAllPesananHandler.bind(this);
    this.acceptPesananForMitra = this.acceptPesananForMitra.bind(this);
    this.endedPesananByMitra = this.endedPesananByMitra.bind(this);
  }

  async postPesananHandler(request, h) {
    try {
      this._validator.validatePesanPayload(request.payload);

      const {
        user_id, kecamatan_user, kota_user, barang, alamat,
      } = request.payload;

      const pesan = await this._service.addPesanan({
        user_id, kecamatan_user, kota_user, barang, alamat,
      });
      console.log(pesan);

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

  async getPesananByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const pesanan = await this._service.getPesananById(id);

      return {
        status: 'success',
        data: {
          pesanan,
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

      // server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  // todo get pesanan by user id

  // todo get pesanan by mitra id

  async acceptPesananForMitra(request, h) {
    try {
      this._validator.validateAcceptedPesanPayload(request.payload);

      const { pesanan_id, mitra_id } = request.payload;

      await this._service.editPesananById({ pesanan_id, mitra_id });

      const response = h.response({
        status: 'success',
        message: 'Pesanan berhasil diterima',
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

      // server ERROR!
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
    try {
      const { mitra_id } = request.payload;

      await this._service.addTransaksiByPesanan(mitra_id);
      await this._service.deletePesananByMitraId(mitra_id);
      const response = h.response({
        status: 'success',
        message: 'Pesanan telah diselesaikan',
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

      // server ERROR!
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
