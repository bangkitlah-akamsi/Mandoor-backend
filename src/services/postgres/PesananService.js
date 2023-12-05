const { nanoid } = require('nanoid');
const { Pool } = require('pg');
// const bcrypt = require('bcrypt');
// const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PesananService {
  constructor(MitraService) {
    this._pool = new Pool();
    this._mitraservice = MitraService;
  }

  async addPesananHasBarang({
    pesanan_id, nama_barang, jumlah_barang, harga_barang,
  }) {
    const id = `pesananhasbarang-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO pesananhasbarang VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, pesanan_id, nama_barang, harga_barang, jumlah_barang],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async generateTotalBarang(pesanan_id) {
    const query = {
      text: 'SELECT SUM(harga_barang * jumlah_barang) AS total_hargabarang \
      FROM pesananhasbarang \
      WHERE pesanan_id = $1;',
      values: [pesanan_id],
    };

    const result = await this._pool.query(query);

    return result.rows[0].total_hargabarang;
  }

  async editTotalBarangById({
    pesanan_id, total_barang, transport, total,
  }) {
    const query = {
      text: 'UPDATE pesanan SET total_barang = $1, transport = $3, total = $4 WHERE id = $2 RETURNING id',
      values: [total_barang, pesanan_id, transport, total],
    };
    console.log(total_barang);
    console.log(total);
    console.log(typeof (total));

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal Merubah total_barang, id tidak ditemukan');
    }

    return result.rows[0];
  }

  async addPesananHasSkill({
    pesanan_id, skill_id, permeter,
  }) {
    const id = `pesananhasbarang-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO pesananhasskill VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, pesanan_id, skill_id, permeter],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async generateTotalHargaSkill(pesanan_id) {
    const query = {
      text: 'SELECT SUM (skill.harga_skill * pesananhasskill.permeter) AS total \
      FROM pesananhasskill \
      JOIN skill ON pesananhasskill.skill_id = skill.id \
      WHERE pesananhasskill.pesanan_id = $1;',
      values: [pesanan_id],
    };

    const result = await this._pool.query(query);

    return result.rows[0].total;
  }

  async addPesanan({
    user_id, kecamatan_user, kota_user, alamat, skill,
  }) {
    const pesanan_id = `pesanan-${nanoid(16)}`;
    const status_order = 'mencari mitra';
    const waktu = new Date();

    let harga_skill = 0;
    // Membuat array promise untuk setiap elemen barang
    const promises = skill.map(
      ([skill_id, permeter]) => this.addPesananHasSkill({
        pesanan_id, skill_id, permeter,
      }),
    );

    // Menjalankan semua promise secara paralel dan menunggu sampai selesai
    const pesananhasskill = await Promise.all(promises);
    harga_skill = await this.generateTotalHargaSkill(pesanan_id);
    console.log(pesananhasskill);
    const query = {
      text: 'INSERT INTO pesanan (id, user_id, kecamatan_user, kota_user, harga_skill, alamat, status_order, waktu) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, status_order',
      values: [
        pesanan_id, user_id, kecamatan_user, kota_user,
        harga_skill, alamat, status_order, waktu.toISOString(),
      ],
    };

    const result = await this._pool.query(query);

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

  async getPesananSnapById(id) {
    const query = {
      text: 'SELECT pesanan.*, fullname, email \
      FROM pesanan INNER JOIN users ON user_id = users.id \
      WHERE pesanan.id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Pesanan tidak ditemukan');
    }
    console.log(result.rows[0]);
    return result.rows[0];
  }

  async getPesananHasSkillSnapById(id) {
    const query = {
      text: 'SELECT pesananhasskill.*, nama_skill, harga_skill \
      FROM pesananhasskill \
      INNER JOIN skill ON skill_id = skill.id \
      WHERE pesananhasskill.pesanan_id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Pesanan tidak ditemukan');
    }
    console.log(result.rows);
    return result.rows;
  }

  async getPesananByMitraSkillId(mitra_id) {
    const skill = await this._mitraservice.getMitraHasSkillById(mitra_id);
    const skillarray = await skill.map((element) => element.skill_id);
    console.log(skillarray);
    const query = {
      text: 'SELECT * FROM pesanan \
      INNER JOIN pesananhasskill ON pesananhasskill.pesanan_id = pesanan.id \
      WHERE pesananhasskill.skill_id LIKE ANY($1)',
      values: [skillarray],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Pesanan tidak ditemukan');
    }
    console.log(result.rows);
    return result.rows;
  }

  async verifiyMitraIdPesanan(pesanan_id) {
    const query = {
      text: 'SELECT mitra_id FROM pesanan WHERE id = $1',
      values: [pesanan_id],
    };
    const result = await this._pool.query(query);
    console.log(result.rows[0]);

    if (result.rows[0].mitra_id === null) {
      return true;
    }
    throw new NotFoundError('Pesanan sudah diambil driver lain');
  }

  async editStatusPesananById(id, status) {
    const query = {
      text: 'UPDATE pesanan SET status_order = $1 WHERE mitra_id = $2 RETURNING id',
      values: [status, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal Menyelesaikan pesanan, id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async editStatusMitraById(id, status_mitra) {
    const query = {
      text: 'UPDATE mitras SET status_mitra = $1 WHERE id = $2 RETURNING id',
      values: [status_mitra, id],
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

  // todo get all pesananhasbarang

  async generateTransport(kecamatan_user, kecamatan_mitra) {
    if (kecamatan_user === kecamatan_mitra) {
      return 7000;
    }
    const query = {
      text: 'SELECT jarak FROM transport WHERE ( kecamatan_user = $1 AND kecamatan_mitra = $2 ) \
      OR ( kecamatan_user = $2 AND kecamatan_mitra = $1 )',
      values: [kecamatan_user, kecamatan_mitra],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('kecamatan tidak ditemukan');
    }

    const { jarak } = result.rows[0];
    const tarifDasar = 5000;
    const tarifPerKM = 2000;
    const ongkir = tarifPerKM * jarak;
    const totalongkir = tarifDasar + ongkir;
    console.log(`ini ongkir : ${totalongkir}`);
    console.log(typeof (totalongkir));
    return totalongkir;
  }

  async editTransportById(id, transport, total) {
    const query = {
      text: 'UPDATE pesanan SET transport = $1, total = $3 WHERE id = $2 RETURNING id, kecamatan_user, kecamatan_mitra',
      values: [transport, id, total],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui pesanan. Id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async verifiyMitraStatusPesanan(mitra_id) {
    const query = {
      text: 'SELECT status_mitra FROM mitras WHERE id = $1',
      values: [mitra_id],
    };
    const result = await this._pool.query(query);
    console.log(result.rows[0].status_mitra);

    if (result.rows[0].status_mitra === true) {
      throw new NotFoundError('Mitra tidak bisa mengambil pesanan lagi karena masih menjalankan pesanan');
    }
    return result.rows[0].status_mitra;
  }

  async editPesananById({
    pesanan_id, mitra_id, barang,
  }) {
    // to do cek mitra id apakah sudah terisi
    await this.verifiyMitraStatusPesanan(mitra_id);
    await this.verifiyMitraIdPesanan(pesanan_id, mitra_id);
    const status = 'berjalan';
    const status_mitra = true;
    const query = {
      text: 'UPDATE pesanan SET mitra_id = mitras.id,\
      kecamatan_mitra = mitras.kecamatan, \
      kota_mitra = mitras.kota, \
      status_order = $3, \
      total_barang = 0 \
       FROM mitras \
       WHERE pesanan.id = $1 AND mitras.id = $2 RETURNING pesanan.id, pesanan.kecamatan_user, pesanan.kecamatan_mitra, pesanan.harga_skill',
      values: [pesanan_id, mitra_id, status],
    };

    const result = await this._pool.query(query);
    console.log(result.rows);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Pesanan. Id tidak ditemukan');
    }

    await this.editStatusMitraById(mitra_id, status_mitra);

    const { kecamatan_user } = result.rows[0];
    const { kecamatan_mitra } = result.rows[0];
    const { harga_skill } = result.rows[0];

    console.log(kecamatan_user);
    let total_barang = 0;
    let total = 0;
    if (barang.length) {
      // Membuat array promise untuk setiap elemen barang
      const promises = barang.map(
        ([nama_barang, jumlah_barang, harga_barang]) => this.addPesananHasBarang({
          pesanan_id, nama_barang, jumlah_barang, harga_barang,
        }),
      );

      // Menjalankan semua promise secara paralel dan menunggu sampai selesai
      const pesananhasbarang = await Promise.all(promises);

      console.log(pesananhasbarang);
      total_barang = await this.generateTotalBarang(pesanan_id);
      const transport = await this.generateTransport(kecamatan_user, kecamatan_mitra);
      total = parseInt(transport, 10) + parseInt(total_barang, 10) + parseInt(harga_skill, 10);
      const dataPesanan = await this.editTotalBarangById({
        pesanan_id, total_barang, transport, total,
      });
      console.log(dataPesanan);
      return dataPesanan;
    }
    const transport = await this.generateTransport(kecamatan_user, kecamatan_mitra);
    total = parseInt(transport, 10) + parseInt(harga_skill, 10);
    const editPesanan = await this.editTransportById(pesanan_id, transport, total);
    return editPesanan;
  }

  async addTransaksiByPesanan(mitra_id) {
    const query = {
      text: 'INSERT INTO transaksi (id, mitra_id, user_id, kecamatan_user, kota_user, kecamatan_mitra, kota_mitra, total_barang, harga_skill, transport, total, status_order, waktu_transaksi) \
      SELECT id, mitra_id, user_id, kecamatan_user, kota_user, kecamatan_mitra, kota_mitra, total_barang, harga_skill, transport, total, status_order, waktu \
      FROM pesanan WHERE mitra_id = $1',
      values: [mitra_id],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async deletePesananHasSkill(pesanan_id) {
    const query = {
      text: 'DELETE FROM pesananhasskill WHERE pesanan_id = $1 RETURNING pesanan_id',
      values: [pesanan_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('gagal menghapus skill. Id pesanan tidak ditemukan');
    }
    return result.rows[0];
  }

  async deletePesananHasBarang(pesanan_id) {
    const queryPesananHasBarang = {
      text: 'DELETE FROM pesananhasbarang WHERE pesanan_id = $1 RETURNING pesanan_id',
      values: [pesanan_id],
    };

    const resultPesananHasBarang = await this._pool.query(queryPesananHasBarang);

    if (!resultPesananHasBarang.rows.length) {
      throw new NotFoundError('gagal menghapus skill. Id pesanan tidak ditemukan');
    }
    return resultPesananHasBarang.rows[0];
  }

  async getPesananByMitraId(mitra_id) {
    const query = {
      text: 'SELECT id FROM pesanan WHERE mitra_id = $1',
      values: [mitra_id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Pesanan tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async deletePesananByMitraId(id) {
    const status = 'selesai';
    const pesanan_id = await this.editStatusPesananById(id, status);
    await this.addTransaksiByPesanan(id);

    await this.deletePesananHasSkill(pesanan_id);
    await this.deletePesananHasBarang(pesanan_id);
    const queryPesanan = {
      text: 'DELETE FROM pesanan WHERE mitra_id = $1 RETURNING id',
      values: [id],
    };

    const resultPesanan = await this._pool.query(queryPesanan);
    console.log('ini id pesan1 :');
    console.log(resultPesanan.rows[0]);
    if (!resultPesanan.rows.length) {
      throw new NotFoundError('gagal menghapus pesanan. Id tidak ditemukan');
    }
    const status_mitra = false;
    await this.editStatusMitraById(id, status_mitra);

    return resultPesanan.rows[0];
  }
}

module.exports = PesananService;
