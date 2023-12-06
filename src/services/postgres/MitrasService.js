const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class MitrasService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password FROM mitras WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah, email salah');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah, password salah');
    }
    return id;
  }

  async verifyNewMitraname(mitraname) {
    const query = {
      text: 'SELECT mitraname FROM mitras WHERE mitraname = $1',
      values: [mitraname],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan mitra. Nama sudah digunakan.');
    }
  }

  async verifyNomorWa(nomorwa) {
    const query = {
      text: 'SELECT nomorwa FROM mitras WHERE nomorwa = $1',
      values: [nomorwa],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan mitra. Nomor sudah digunakan.');
    }
  }

  async verifyNewEmail(email) {
    const query = {
      text: 'SELECT email FROM mitras WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan mitra. email sudah digunakan.');
    }
  }

  async verifyNewEmailUserInMitra(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan mitra. email sudah digunakan sebagai user.');
    }
  }

  async verifyNewNoKTP(noKTP) {
    const query = {
      text: 'SELECT noKTP FROM mitras WHERE noKTP = $1',
      values: [noKTP],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan mitra. KTP sudah digunakan.');
    }
  }

  async addSkillInMitraHasSkill({ mitra_id, element }) {
    const id = `mitrahasskill-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO mitrahasskill (id, mitra_id, skill_id) VALUES($1, $2, $3) RETURNING skill_id',
      values: [id, mitra_id, element],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async addMitra({
    email, mitraname, fullname, password, noKTP, nomorwa, alamat, kecamatan, kota, skill,
  }) {
    // TODO: Verifikasi email, pastikan belum terdaftar sebagai mitra.
    await this.verifyNewEmail(email);
    // TODO: Verifikasi email, pastikan belum terdaftar sebagai user.
    await this.verifyNewEmailUserInMitra(email);
    // TODO: Verifikasi mitraname, pastikan belum terdaftar.
    await this.verifyNewMitraname(mitraname);
    // TODO: Verifikasi NoKTP, pastikan belum terdaftar.
    await this.verifyNewNoKTP(noKTP);
    // TODO: Verifikasi nomorwa, pastikan belum terdaftar.
    await this.verifyNomorWa(nomorwa);
    // TODO: Bila verifikasi lolos, maka masukkan mitra baru ke database.
    const mitra_id = `mitra-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const status_mitra = false;
    const query = {
      text: 'INSERT INTO mitras (id, email, mitraname, fullname, password, noktp, nomorwa, alamat, kecamatan, kota, status_mitra) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, email, password',
      values: [mitra_id, email, mitraname, fullname,
        hashedPassword, noKTP, nomorwa, alamat, kecamatan, kota, status_mitra],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Mitra gagal ditambahkan');
    }

    if (skill.length) {
      skill.forEach((element) => {
        this.addSkillInMitraHasSkill({ mitra_id, element });
      });
    } else {
      throw new InvariantError('Mitra gagal ditambahkan, harap isi skill dengan benar');
    }
    const dataMitra = {
      ...result.rows[0],
      skill,
    };

    console.log('ini data mitra : ');
    console.log(dataMitra);
    return dataMitra;
  }

  async getMitraHasSkillById(id) {
    const query = {
      text: 'SELECT skill_id FROM mitrahasskill WHERE mitra_id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    console.log(result.rows);
    return result.rows;
  }

  async getMitraByEmail(email) {
    const query = {
      text: 'SELECT * FROM mitras WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Mitra tidak ditemukan');
    }

    const skill = await this.getMitraHasSkillById(result.rows[0].id);
    const skillarray = await skill.map((element) => element.skill_id);
    const dataMitra = {
      ...result.rows[0],
      skillarray,
    };

    return dataMitra;
  }

  async getAllMitra() {
    const result = await this._pool.query('SELECT * FROM mitras');

    return result.rows;
  }

  async getMitraById(id) {
    const query = {
      text: 'SELECT * FROM mitras WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Mitra tidak ditemukan');
    }

    const skill = await this.getMitraHasSkillById(id);
    const skillarray = await skill.map((element) => element.skill_id);
    const dataMitra = {
      ...result.rows[0],
      skillarray,
    };

    return dataMitra;
  }

  async getMitraByMitraname(mitraname) {
    const query = {
      text: 'SELECT * FROM mitras WHERE mitraname LIKE $1',
      values: [`%${mitraname}%`],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Mitra tidak ditemukan');
    }
    return result.rows;
  }

  async deleteMitraHasSkill(mitra_id) {
    const query = {
      text: 'DELETE FROM mitrahasskill WHERE mitra_id = $1 RETURNING skill_id',
      values: [mitra_id],
    };
    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async editMitraById(id, {
    email, mitraname, fullname, password, noKTP, nomorwa, alamat, kecamatan, kota, skill,
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'UPDATE mitras SET email = $2, mitraname = $3, fullname = $4, password = $5, noktp = $6, nomorwa = $7, alamat = $8, kecamatan = $9, kota = $10 WHERE id = $1 RETURNING id, email, password',
      values: [id, email, mitraname, fullname,
        hashedPassword, noKTP, nomorwa, alamat, kecamatan, kota],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Mitra. Id tidak ditemukan');
    }
    const mitra_id = id;

    if (skill.length) {
      await this.deleteMitraHasSkill(id);
      skill.forEach(async (element) => {
        console.log(element);
        await this.addSkillInMitraHasSkill({ mitra_id, element });
      });
    } else {
      throw new InvariantError('Mitra gagal ditambahkan, harap isi skill dengan benar');
    }

    const dataMitra = {
      ...result.rows[0],
      skill,
    };

    return dataMitra;
  }

  async deleteMitraById(id) {
    const query = {
      text: 'DELETE FROM mitras WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('gagal menghapus mitra. Id tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = MitrasService;
