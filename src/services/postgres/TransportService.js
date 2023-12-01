const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');

class TransportService {
  constructor() {
    this._pool = new Pool();
  }

  async addTransport({ kecamatan_user, kecamatan_mitra, jarak }) {
    const id = `transport-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO transport VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, kecamatan_user, kecamatan_mitra, jarak],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getAllTransport() {
    const result = await this._pool.query('SELECT * FROM transport');

    return result.rows;
  }

  async deleteTransportById(id) {
    const query = {
      text: 'DELETE FROM transport WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('gagal menghapus transport. Id tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = TransportService;
