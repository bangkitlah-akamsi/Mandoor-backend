const { nanoid } = require('nanoid');
const { Pool } = require('pg');
// const bcrypt = require('bcrypt');
// const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PesananService {
  constructor() {
    this._pool = new Pool();
  }

  async addPesananHasBarang({ pesanan_id, barang_id, jumlah_barang }) {
    const id = `pesananhasbarang-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO pesananhasbarang VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, pesanan_id, barang_id, jumlah_barang],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async generateTotalBarang(pesanan_id) {
    const query = {
      text: 'SELECT p.pesanan_id, SUM (p.jumlah_barang * b.harga_barang) AS total_barang\
        FROM pesananhasbarang AS p\
        JOIN barang AS b\
        ON p.barang_id = b.id\
        WHERE p.pesanan_id = $1 GROUP BY p.pesanan_id',
      values: [pesanan_id],
    };

    const result = await this._pool.query(query);

    return result.rows[0].total_barang;
  }

  async editTotalBarangById({ pesanan_id, total_barang }) {
    const query = {
      text: 'UPDATE pesanan SET total_barang = $1 WHERE id = $2 RETURNING id',
      values: [total_barang, pesanan_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal Merubah total_barang, id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async addPesanan({
    user_id, kecamatan_user, kota_user, barang, alamat,
  }) {
    const pesanan_id = `pesanan-${nanoid(16)}`;
    const status_order = 'mencari mitra';
    const query = {
      text: 'INSERT INTO pesanan (id, user_id, kecamatan_user, kota_user, alamat, status_order) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, status_order',
      values: [pesanan_id, user_id, kecamatan_user, kota_user, alamat, status_order],
    };

    const result = await this._pool.query(query);
    let total_barang = null;
    if (barang !== null) {
      // Membuat array promise untuk setiap elemen barang
      const promises = barang.map(([barang_id, jumlah_barang]) => this.addPesananHasBarang({
        pesanan_id, barang_id, jumlah_barang,
      }));

      // Menjalankan semua promise secara paralel dan menunggu sampai selesai
      const pesananhasbarang = await Promise.all(promises);

      console.log(pesananhasbarang);
      total_barang = await this.generateTotalBarang(pesanan_id);
    }
    console.log(total_barang);
    await this.editTotalBarangById({ pesanan_id, total_barang });

    return result.rows[0];
  }

  async getPesananById(id) {
    const query = {
      text: 'SELECT * FROM pesanan WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Pesanan tidak ditemukan');
    }

    return result.rows[0];
  }

  async verifiyMitraIdPesanan(mitra_id) {
    const query = {
      text: 'SELECT * FROM pesanan WHERE mitra_id = $1',
      values: [mitra_id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      return true;
    }
    throw new NotFoundError('Pesanan sudah diambil driver lain');
  }

  async editStatusPesananById(id, status) {
    const query = {
      text: 'UPDATE pesanan SET status = $1 WHERE id = $2 RETURNING id',
      values: [status, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal Menyelesaikan pesanan, id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async editStatusMitraById(id, status) {
    const query = {
      text: 'UPDATE mitras SET status = $1 WHERE id = $2 RETURNING id',
      values: [status, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal Merubah status, id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async getAllPesanan() {
    const result = await this._pool.query('SELECT * FROM pesanan');

    return result.rows;
  }

  async editPesananById({
    pesanan_id, mitra_id,
  }) {
    // to do cek mitra id apakah sudah terisi
    await this.verifiyMitraIdPesanan(mitra_id);
    const status = 'berjalan';
    const query = {
      text: 'UPDATE pesanan SET mitra_id = mitras.id,\
      kecamatan_mitra = mitras.kecamatan, \
      kota_mitra = mitras.kota, \
      status_order = $3 \
       FROM mitras \
       WHERE pesanan.id = $1 AND mitras.id = $2 RETURNING pesanan.id',
      values: [pesanan_id, mitra_id, status],
    };

    const result = await this._pool.query(query);
    console.log(result.rows);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Pesanan. Id tidak ditemukan');
    }

    return result.rows[0];
  }

  async addTransaksiByPesanan(mitra_id) {
    const query = {
      text: 'INSERT INTO transaksi (id, mitra_id, user_id, kecamatan_user, kota_user, kecamatan_mitra, kota_mitra, total_barang, harga_skill, transport, total) \
      SELECT id, mitra_id, user_id, kecamatan_user, kota_user, kecamatan_mitra, kota_mitra, total_barang, harga_skill, transport, total \
      FROM pesanan WHERE mitra_id = $1',
      values: [mitra_id],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async deletePesananByMitraId(id) {
    const queryPesanan = {
      text: 'DELETE FROM pesanan WHERE mitra_id = $1 RETURNING id',
      values: [id],
    };

    const resultPesanan = await this._pool.query(queryPesanan);
    if (!resultPesanan.rows.length) {
      throw new NotFoundError('gagal menghapus pesanan. Id tidak ditemukan');
    }

    const pesanan_id = resultPesanan.rows[0].id;

    const queryPesananHasBarang = {
      text: 'DELETE FROM pesananhasbarang WHERE pesanan_id = $1 RETURNING id',
      values: [pesanan_id],
    };

    const resultPesananHasBarang = await this._pool.query(queryPesananHasBarang);
    if (!resultPesananHasBarang.rows.length) {
      throw new NotFoundError('gagal menghapus pesanan. Id tidak ditemukan');
    }
    return resultPesanan.rows[0];
  }
}

module.exports = PesananService;
