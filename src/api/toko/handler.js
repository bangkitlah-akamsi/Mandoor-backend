const ClientError = require('../../exceptions/ClientError');

class TokoHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postTokoHandler = this.postTokoHandler.bind(this);
    this.getAllTokoHandler = this.getAllTokoHandler.bind(this);
    this.getTokoByIdHandler = this.getTokoByIdHandler.bind(this);
    this.getTokoByNamaTokoHandler = this.getTokoByNamaTokoHandler.bind(this);
    this.getTokoByNamaPemilikHandler = this.getTokoByNamaPemilikHandler.bind(this);
    this.putTokoByIdHandler = this.putTokoByIdHandler.bind(this);
    this.deleteTokoByIdHandler = this.deleteTokoByIdHandler.bind(this);
  }

  async postTokoHandler(request, h) {
    try {
      this._validator.validateTokoPayload(request.payload);
      const {
        nama_toko, nama_pemilik, kecamatan, kota, alamat,
      } = request.payload;

      const dataToko = await this._service.addToko({
        nama_toko, nama_pemilik, kecamatan, kota, alamat,
      });
      console.log(dataToko);

      const response = h.response({
        status: 'success',
        message: 'Toko berhasil ditambahkan',
        data: dataToko,
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

  async getAllTokoHandler() {
    // to do : validation credential admin
    const Toko = await this._service.getAllToko();
    return {
      status: 'success',
      data: {
        Toko,
      },
    };
  }

  async getTokoByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const toko = await this._service.getTokoById(id);

      return {
        status: 'success',
        data: {
          toko,
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

  async getTokoByNamaTokoHandler(request, h) {
    try {
      const { nama_toko } = request.params;

      const toko = await this._service.getTokoByNamaToko(nama_toko);

      return {
        status: 'success',
        data: {
          toko,
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

  async getTokoByNamaPemilikHandler(request, h) {
    try {
      const { nama_pemilik } = request.params;

      const toko = await this._service.getTokoByNamaPemilik(nama_pemilik);

      return {
        status: 'success',
        data: {
          toko,
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

  async putTokoByIdHandler(request, h) {
    try {
      this._validator.validateTokoPayload(request.payload);
      const {
        nama_toko, nama_pemilik, kecamatan, kota, alamat,
      } = request.payload;
      const { id } = request.params;

      await this._service.editTokoById(id, {
        nama_toko, nama_pemilik, kecamatan, kota, alamat,
      });

      const response = h.response({
        status: 'success',
        message: `Toko ${nama_toko} berhasil diperbarui`,
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

  async deleteTokoByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteTokoById(id);
      const response = h.response({
        status: 'success',
        message: 'Toko berhasil dihapus',
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

module.exports = TokoHandler;