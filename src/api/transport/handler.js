const ClientError = require('../../exceptions/ClientError');

class TransportHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postTransportHandler = this.postTransportHandler.bind(this);
    this.getAllTransportHandler = this.getAllTransportHandler.bind(this);
    this.deleteTransportByIdHandler = this.deleteTransportByIdHandler.bind(this);
  }

  async postTransportHandler(request, h) {
    try {
      this._validator.validateTransportPayload(request.payload);
      const { kecamatan_user, kecamatan_mitra, jarak } = request.payload;

      const dataTransport = await this._service.addTransport({
        kecamatan_user, kecamatan_mitra, jarak,
      });

      console.log(dataTransport);

      const response = h.response({
        status: 'success',
        message: 'data berhasil ditambahkan',
        data: dataTransport,
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

  async getAllTransportHandler() {
    // to do : validation credential admin
    const Transport = await this._service.getAllTransport();
    return {
      status: 'success',
      data: {
        Transport,
      },
    };
  }

  async deleteTransportByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteTransportById(id);
      const response = h.response({
        status: 'success',
        message: 'data berhasil dihapus',
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

module.exports = TransportHandler;
