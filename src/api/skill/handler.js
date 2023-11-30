const ClientError = require('../../exceptions/ClientError');

class SkillHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSkillHandler = this.postSkillHandler.bind(this);
    this.getAllSkillHandler = this.getAllSkillHandler.bind(this);
    this.getSkillByIdHandler = this.getSkillByIdHandler.bind(this);
    this.putSkillByIdHandler = this.putSkillByIdHandler.bind(this);
    this.deleteSkillByIdHandler = this.deleteSkillByIdHandler.bind(this);
  }

  async postSkillHandler(request, h) {
    try {
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

  async getSkillByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const skill = await this._service.getSkillById(id);

      return {
        status: 'success',
        data: {
          skill,
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

  async putSkillByIdHandler(request, h) {
    try {
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

  async deleteSkillByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteSkillById(id);
      const response = h.response({
        status: 'success',
        message: 'Skill berhasil dihapus',
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

module.exports = SkillHandler;
