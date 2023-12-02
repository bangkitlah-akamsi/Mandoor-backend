class SkillHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postSkillHandler(request, h) {
    this._validator.validateSkillPayload(request.payload);
    const { nama_skill, harga_skill, hitungan } = request.payload;

    const dataSkill = await this._service.addSkill({
      nama_skill, harga_skill, hitungan,
    });
    console.log(dataSkill);

    const response = h.response({
      status: 'success',
      message: 'Skill berhasil ditambahkan',
      data: dataSkill,
    });
    response.code(201);
    return response;
  }

  async getAllSkillHandler() {
    // to do : validation credential admin
    const Skill = await this._service.getAllSkill();
    return {
      status: 'success',
      data: {
        Skill,
      },
    };
  }

  async getSkillByIdHandler(request) {
    const { id } = request.params;

    const skill = await this._service.getSkillById(id);

    return {
      status: 'success',
      data: {
        skill,
      },
    };
  }

  async putSkillByIdHandler(request, h) {
    this._validator.validateSkillPayload(request.payload);
    const { nama_skill, harga_skill, hitungan } = request.payload;
    const { id } = request.params;

    await this._service.editSkillById(id, {
      nama_skill, harga_skill, hitungan,
    });

    const response = h.response({
      status: 'success',
      message: `${nama_skill} berhasil diperbarui`,
    });
    response.code(200);
    return response;
  }

  async deleteSkillByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteSkillById(id);
    const response = h.response({
      status: 'success',
      message: 'Skill berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = SkillHandler;
