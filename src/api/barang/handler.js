const ClientError = require('../../exceptions/ClientError');

class BarangHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postBarangHandler = this.postBarangHandler.bind(this);
    this.getAllBarangHandler = this.getAllBarangHandler.bind(this);
    this.getBarangByIdHandler = this.getBarangByIdHandler.bind(this);
    this.getBarangByNamaBarangHandler = this.getBarangByNamaBarangHandler.bind(this);
    this.getBarangByNamaTokoHandler = this.getBarangByNamaTokoHandler.bind(this);
    this.getBarangByIdTokoHandler = this.getBarangByIdTokoHandler.bind(this);
    this.putBarangByIdHandler = this.putBarangByIdHandler.bind(this);
    this.deleteBarangByIdHandler = this.deleteBarangByIdHandler.bind(this);
  }

  async postBarangHandler(request, h) {
    try {
      this._validator.validateBarangPayload(request.payload);
      const {
        toko_id, nama_barang, harga_barang, status_ketersediaan,
      } = request.payload;

      const dataBarang = await this._service.addBarang({
        toko_id, nama_barang, harga_barang, status_ketersediaan,
      });
      console.log(dataBarang);

      const response = h.response({
        status: 'success',
        message: 'Barang berhasil ditambahkan',
        data: dataBarang,
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

  async getAllBarangHandler() {
    const Barang = await this._service.getAllBarang();
    return {
      status: 'success',
      data: {
        Barang,
      },
    };
  }

  async getBarangByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const barang = await this._service.getBarangById(id);

      return {
        status: 'success',
        data: {
          barang,
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

  async getBarangByNamaBarangHandler(request, h) {
    try {
      const { nama_barang } = request.params;

      const barang = await this._service.getBarangByNamaBarang(nama_barang);
      return {
        status: 'success',
        data: {
          barang,
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

  async getBarangByNamaTokoHandler(request, h) {
    try {
      const { nama_toko } = request.params;

      const barang = await this._service.getBarangByNamaToko(nama_toko);

      return {
        status: 'success',
        data: {
          barang,
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

  async getBarangByIdTokoHandler(request, h) {
    try {
      const { toko_id } = request.params;

      const barang = await this._service.getBarangByToko(toko_id);

      return {
        status: 'success',
        data: {
          barang,
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

  async putBarangByIdHandler(request, h) {
    try {
      this._validator.validateBarangPayload(request.payload);
      const {
        toko_id, nama_barang, harga_barang, status_ketersediaan,
      } = request.payload;
      const { id } = request.params;

      await this._service.editBarangById(id, {
        toko_id, nama_barang, harga_barang, status_ketersediaan,
      });

      const response = h.response({
        status: 'success',
        message: `Barang ${nama_barang} berhasil diperbarui`,
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

  async deleteBarangByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteBarangById(id);
      const response = h.response({
        status: 'success',
        message: 'Barang berhasil dihapus',
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

module.exports = BarangHandler;
