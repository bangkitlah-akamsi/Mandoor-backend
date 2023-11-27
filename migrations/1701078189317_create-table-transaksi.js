/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('transaksi', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    mitra_id: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    kecamatan_user: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    kota_user: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    kecamatan_mitra: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    kota_mitra: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    total_barang: {
      type: 'INTEGER',
      notNull: false,
    },
    harga_skill: {
      type: 'INTEGER',
      notNull: false,
    },
    transport: {
      type: 'INTEGER',
      notNull: false,
    },
    total: {
      type: 'INTEGER',
      notNull: false,
    },
    status_order: {
      type: 'VARCHAR(15)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('transaksi');
};
