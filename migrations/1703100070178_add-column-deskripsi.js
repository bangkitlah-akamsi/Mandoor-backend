/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('pesanan', {
    deskripsi: {
      type: 'VARCHAR',
      notNull: false,
    },
  });
  pgm.addColumn('transaksi', {
    deskripsi: {
      type: 'VARCHAR',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('pesanan', 'deskripsi');
  pgm.dropColumn('transaksi', 'deskripsi');
};
