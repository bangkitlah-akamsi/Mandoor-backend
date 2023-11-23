const { nanoid } = require('nanoid');
const { Pool } = require('pg');
// const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class BarangService {
  constructor() {
    this._pool = new Pool();
  }

  async addBarang({
    toko_id, nama_barang, harga_barang, status_ketersediaan,
  }) {
    const id = `barang-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO barang VALUES($1, $2, $3, $4, $5) RETURNING id, nama_barang, harga_barang',
      values: [id, toko_id, nama_barang, harga_barang, status_ketersediaan],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Barang gagal ditambahkan');
    }
    console.log('Barang ditambahkan');
    return result.rows[0];
  }

  async getAllBarang() {
    const result = await this._pool.query('SELECT * FROM barang');

    return result.rows;
  }

  async getBarangById(id) {
    const query = {
      text: 'SELECT * FROM barang WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Barang tidak ditemukan');
    }

    return result.rows[0];
  }

  async getBarangByNamaBarang(nama_barang) {
    const query = {
      text: 'SELECT * FROM barang WHERE nama_barang ILIKE $1',
      values: [`%${nama_barang}%`],
    };
    const result = await this._pool.query(query);
    console.log(result.rows);

    if (!result.rows.length) {
      throw new NotFoundError('Barang tidak ditemukan');
    }

    return result.rows[0];
  }

  async getBarangByToko(toko_id) {
    const query = {
      text: 'SELECT * FROM barang WHERE toko_id = $1;',
      values: [toko_id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Barang tidak ditemukan');
    }

    return result.rows[0];
  }

  async getBarangByNamaToko(nama_toko) {
    const query = {
      text: 'SELECT nama_toko, nama_barang, status_ketersediaan, harga_barang, barang.id FROM toko INNER JOIN barang ON toko.id = barang.toko_id WHERE nama_toko = $1;',
      values: [nama_toko],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Barang tidak ditemukan');
    }

    return result.rows[0];
  }

  async editBarangById(id, {
    toko_id, nama_barang, harga_barang, status_ketersediaan,
  }) {
    const query = {
      text: 'UPDATE toko SET toko_id = $1, nama_barang = $2, harga_barang = $3, status_ketersediaan = $4 WHERE id = $5 RETURNING id',
      values: [toko_id, nama_barang, harga_barang, status_ketersediaan, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Barang. Id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async deleteBarangById(id) {
    const query = {
      text: 'DELETE FROM barang WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('gagal menghapus barang. Id tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = BarangService;
