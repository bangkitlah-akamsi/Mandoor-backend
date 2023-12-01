const ClientError = require('../../exceptions/ClientError');

class MitrasHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postMitraHandler = this.postMitraHandler.bind(this);
    this.getMitraByIdHandler = this.getMitraByIdHandler.bind(this);
    this.getMitraHandler = this.getMitraHandler.bind(this);
    this.getMitraByEmailHandler = this.getMitraByEmailHandler.bind(this);
    this.getMitraByMitranameHandler = this.getMitraByMitranameHandler.bind(this);
    this.putMitraByIdHandler = this.putMitraByIdHandler.bind(this);
  }

  async postMitraHandler(request, h) {
    try {
      this._validator.validateMitraPayload(request.payload);
      const {
        email, mitraname, fullname, password, noKTP, nomorwa, alamat, kecamatan, kota, skill,
      } = request.payload;

      const dataMitra = await this._service.addMitra({
        email, mitraname, fullname, password, noKTP, nomorwa, alamat, kecamatan, kota, skill,
      });
      console.log(dataMitra);

      const response = h.response({
        status: 'success',
        message: 'Mitra berhasil ditambahkan',
        data: {
          dataMitra,
        },
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

  async getMitraHandler() {
    // to do : validation credential admin
    const dataMitra = await this._service.getAllMitra();
    return {
      status: 'success',
      data: {
        dataMitra,
      },
    };
  }

  async getMitraByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const Mitra = await this._service.getMitraById(id);

      return {
        status: 'success',
        data: {
          Mitra,
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

  async getMitraByEmailHandler(request, h) {
    try {
      const { email } = request.params;

      const mitra = await this._service.getMitraByEmail(email);

      return {
        status: 'success',
        data: {
          mitra,
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

  async getMitraByMitranameHandler(request, h) {
    try {
      const { mitraname } = request.params;

      const mitra = await this._service.getMitraByMitraname(mitraname);
      return {
        status: 'success',
        data: {
          mitra,
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

  async putMitraByIdHandler(request, h) {
    try {
      this._validator.validateMitraPayload(request.payload);
      const {
        email, mitraname, fullname, password, noKTP, nomorwa, alamat, kecamatan, kota, skill,
      } = request.payload;
      const { id } = request.params;

      await this._service.editMitraById(id, {
        email, mitraname, fullname, password, noKTP, nomorwa, alamat, kecamatan, kota, skill,
      });

      const response = h.response({
        status: 'success',
        message: `data ${mitraname} berhasil diperbarui`,
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

module.exports = MitrasHandler;
