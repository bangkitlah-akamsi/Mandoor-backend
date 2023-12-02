class MitrasHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postMitraHandler(request, h) {
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

  async getMitraByIdHandler(request) {
    const { id } = request.params;

    const Mitra = await this._service.getMitraById(id);

    return {
      status: 'success',
      data: {
        Mitra,
      },
    };
  }

  async getMitraByEmailHandler(request) {
    const { email } = request.params;

    const mitra = await this._service.getMitraByEmail(email);

    return {
      status: 'success',
      data: {
        mitra,
      },
    };
  }

  async getMitraByMitranameHandler(request) {
    const { mitraname } = request.params;

    const mitra = await this._service.getMitraByMitraname(mitraname);
    return {
      status: 'success',
      data: {
        mitra,
      },
    };
  }

  async putMitraByIdHandler(request, h) {
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
  }

  async deleteMitraByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteMitraById(id);
    const response = h.response({
      status: 'success',
      message: 'Mitra berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = MitrasHandler;
