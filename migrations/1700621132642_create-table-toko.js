/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('toko', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    nama_toko: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    nama_pemilik: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    kecamatan: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    kota: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    alamat: {
      type: 'TEXT',
      notNull: true,
    },
    profile_toko: {
      type: 'VARCHAR',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('toko');
};
