class PesananHandler {
  constructor(service, storageService, validator, UploadsValidator) {
    this._service = service;
    this._storageService = storageService;
    this._validator = validator;
    this._UploadsValidator = UploadsValidator;
  }

  async postPesananHandler(request, h) {
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

    const url = await this._storageService.writeFile(gambar, gambar.hapi);
    const pesan = await this._service.addPesanan({
      user_id, kecamatan_user, kota_user, alamat, skillArray, url,
    });

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

    await this._storageService.deleteFile(mitra_id);
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

  async payPesananForUser(request) {
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
  }
}

module.exports = PesananHandler;
