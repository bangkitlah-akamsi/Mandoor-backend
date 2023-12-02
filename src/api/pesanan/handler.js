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

    await this._service.editPesananById({ pesanan_id, mitra_id, barang });

    const response = h.response({
      status: 'success',
      message: 'Pesanan berhasil diterima',
    });
    response.code(200);
    return response;
  }

  async endedPesananByMitra(request, h) {
    const { mitra_id } = request.params;

    await this._service.addTransaksiByPesanan(mitra_id);
    await this._service.deletePesananByMitraId(mitra_id);
    const response = h.response({
      status: 'success',
      message: 'Pesanan telah diselesaikan',
    });
    response.code(200);
    return response;
  }
}

module.exports = PesananHandler;
