const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE email = $1',
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

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
    }
  }

  async verifyNewEmail(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. email sudah digunakan.');
    }
  }

  async verifyNewNomorwa(nomorwa) {
    const query = {
      text: 'SELECT nomorwa FROM users WHERE nomorwa = $1',
      values: [nomorwa],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. nomorwa sudah digunakan.');
    }
  }

  async addUser({
    email, username, fullname, password, nomorwa, alamat,
  }) {
    // TODO: Verifikasi email, pastikan belum terdaftar.
    await this.verifyNewEmail(email);
    // TODO: Verifikasi username, pastikan belum terdaftar.
    await this.verifyNewUsername(username);
    // TODO: Verifikasi username, pastikan belum terdaftar.
    await this.verifyNewNomorwa(nomorwa);
    // TODO: Bila verifikasi lolos, maka masukkan user baru ke database.
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, password',
      values: [id, email, username, fullname, hashedPassword, nomorwa, alamat],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }
    return result.rows[0];
  }

  async getAllUsers() {
    const result = await this._pool.query('SELECT * FROM users');

    return result.rows;
  }

  async getUserByEmail(email) {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return result.rows[0];
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Id tidak ditemukan');
    }

    return result.rows[0];
  }

  async getUserByUsername(username) {
    const query = {
      text: 'SELECT * FROM users WHERE username LIKE $1',
      values: [`%${username}%`],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }
    return result.rows;
  }

  // todo edit user
  async editUserById(id, {
    email, username, fullname, password, nomorwa, alamat,
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'UPDATE users SET email = $2, username = $3, fullname = $4, password = $5, nomorwa = $6, alamat = $7 WHERE id = $1 RETURNING id, email, password',
      values: [id, email, username, fullname,
        hashedPassword, nomorwa, alamat],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Mitra. Id tidak ditemukan');
    }

    return result.rows[0];
  }

  async deleteUserById(id) {
    const query = {
      text: 'DELETE FROM users WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('gagal menghapus user. Id tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = UsersService;
