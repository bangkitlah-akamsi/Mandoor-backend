/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('pesanan', {
    waktu: {
      type: 'timestamp',
      notNull: true,
      defaultValue: pgm.func('now()'),
    },
  });
  pgm.addColumn('transaksi', {
    waktu_transaksi: {
      type: 'timestamp',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('waktu', 'pesanan');
  pgm.dropColumn('waktu', 'transaksi');
};
