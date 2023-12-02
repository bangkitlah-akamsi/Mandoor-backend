class TransportHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postTransportHandler(request, h) {
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
    const { id } = request.params;
    await this._service.deleteTransportById(id);
    const response = h.response({
      status: 'success',
      message: 'data berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = TransportHandler;
