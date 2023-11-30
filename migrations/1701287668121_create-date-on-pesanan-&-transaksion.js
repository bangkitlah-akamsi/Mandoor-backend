/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('pesanan', {
    waktu: {
      type: 'timestamp',
      notNull: false,
      defaultValue: pgm.func('now()'),
    },
  });
  pgm.addColumn('transaksi', {
    waktu_transaksi: {
      type: 'timestamp',
      notNull: false,
      defaultValue: pgm.func('now()'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('pesanan', 'waktu');
  pgm.dropColumn('transaksi', 'waktu_transaksi');
};
