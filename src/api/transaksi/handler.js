class TransaksiHandler {
  constructor(service) {
    this._service = service;
  }

  async getAllTransaksiHandler() {
    // to do : validation credential admin
    const dataTransaksi = await this._service.getAllTransaksi();
    return {
      status: 'success',
      data: {
        dataTransaksi,
      },
    };
  }

  async getTransaksiByIdHandler(request) {
    const { id } = request.params;

    const Transaksi = await this._service.getTransaksiById(id);

    return {
      status: 'success',
      data: {
        Transaksi,
      },
    };
  }

  async getTransaksiByUserIdHandler(request) {
    const { user_id } = request.params;

    const Transaksi = await this._service.getTransaksiByUserId(user_id);

    return {
      status: 'success',
      data: {
        Transaksi,
      },
    };
  }

  async getTransaksiByMitraIdHandler(request) {
    const { mitra_id } = request.params;

    const Transaksi = await this._service.getTransaksiByMitraId(mitra_id);

    return {
      status: 'success',
      data: {
        Transaksi,
      },
    };
  }
}

module.exports = TransaksiHandler;
