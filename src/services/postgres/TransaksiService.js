const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');

class TransaksiService {
  constructor() {
    this._pool = new Pool();
  }

  async getAllTransaksi() {
    const result = await this._pool.query('SELECT * FROM transaksi');

    return result.rows;
  }

  async getTransaksiById(id) {
    const query = {
      text: 'SELECT * FROM transaksi WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Id tidak ditemukan');
    }

    return result.rows[0];
  }

  async getTransaksiByUserId(id) {
    const query = {
      text: 'SELECT * FROM transaksi WHERE user_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Id tidak ditemukan');
    }

    return result.rows[0];
  }

  async getTransaksiByMitraId(id) {
    const query = {
      text: 'SELECT * FROM transaksi WHERE mitra_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Id tidak ditemukan');
    }

    return result.rows[0];
  }
}

module.exports = TransaksiService;
