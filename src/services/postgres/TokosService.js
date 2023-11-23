const { nanoid } = require('nanoid');
const { Pool } = require('pg');
// const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
// const AuthenticationError = require('../../exceptions/AuthenticationError');

class TokosService {
  constructor() {
    this._pool = new Pool();
  }

  async addToko({
    nama_toko, nama_pemilik, kecamatan, kota, alamat,
  }) {
    const id = `toko-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO toko VALUES($1, $2, $3, $4, $5, $6) RETURNING id, nama_toko, nama_pemilik',
      values: [id, nama_toko, nama_pemilik, kecamatan, kota, alamat],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Toko gagal ditambahkan');
    }
    console.log('Toko ditambahkan');
    return result.rows[0];
  }

  async getAllToko() {
    const result = await this._pool.query('SELECT * FROM toko');

    return result.rows;
  }

  async getTokoById(id) {
    const query = {
      text: 'SELECT * FROM toko WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Toko tidak ditemukan');
    }

    return result.rows[0];
  }

  async getTokoByNamaToko(nama_toko) {
    const query = {
      text: 'SELECT * FROM toko WHERE nama_toko ILIKE $1',
      values: [`%${nama_toko}%`],
    };
    const result = await this._pool.query(query);
    console.log(result.rows);

    if (!result.rows.length) {
      throw new NotFoundError('Toko tidak ditemukan');
    }

    return result.rows[0];
  }

  async editTokoById(id, {
    nama_toko, nama_pemilik, kecamatan, kota, alamat,
  }) {
    const query = {
      text: 'UPDATE toko SET nama_toko = $1, nama_pemilik = $2, kecamatan = $3, kota = $4, alamat = $5 WHERE id = $6 RETURNING id',
      values: [nama_toko, nama_pemilik, kecamatan, kota, alamat, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Toko. Id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async editProfileById(id, profile_toko) {
    const query = {
      text: 'UPDATE toko SET profile_toko = $1 WHERE id = $2 RETURNING id',
      values: [profile_toko, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Profile Toko. Id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async deleteTokoById(id) {
    const query = {
      text: 'DELETE FROM toko WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('gagal menghapus toko. Id tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = TokosService;
