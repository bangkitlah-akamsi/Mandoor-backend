/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.alterColumn('pesanan', 'transport', {
    type: 'FLOAT',
    notNull: false,
  });

  pgm.alterColumn('transaksi', 'transport', {
    type: 'FLOAT',
    notNull: false,
  });

  pgm.alterColumn('pesanan', 'total', {
    type: 'FLOAT',
    notNull: false,
  });

  pgm.alterColumn('transaksi', 'total', {
    type: 'FLOAT',
    notNull: false,
  });
};

exports.down = () => {};
