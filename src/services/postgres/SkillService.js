const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');
// const InvariantError = require('../../exceptions/InvariantError');
const ClientError = require('../../exceptions/ClientError');

class SkillService {
  constructor() {
    this._pool = new Pool();
  }

  async addSkill({ nama_skill, harga_skill, hitungan }) {
    try {
      const id = `skill-${nanoid(16)}`;
      const query = {
        text: 'INSERT INTO skill VALUES($1, $2, $3, $4) RETURNING id',
        values: [id, nama_skill, harga_skill, hitungan],
      };

      const result = await this._pool.query(query);

      return result.rows[0];
    } catch (error) {
      throw new ClientError(error);
    }
  }

  async getAllSkill() {
    const result = await this._pool.query('SELECT * FROM skill');

    return result.rows;
  }

  async getSkillById(id) {
    const query = {
      text: 'SELECT * FROM skill WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Skill tidak ditemukan');
    }

    return result.rows[0];
  }

  async editSkillById(id, {
    nama_skill, harga_skill, hitungan,
  }) {
    const query = {
      text: 'UPDATE skill SET nama_skill = $1, harga_skill = $2, hitungan = $3 WHERE id = $4 RETURNING id',
      values: [nama_skill, harga_skill, hitungan, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Skill. Id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async deleteSkillById(id) {
    const query = {
      text: 'DELETE FROM skill WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('gagal menghapus skill. Id tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = SkillService;
