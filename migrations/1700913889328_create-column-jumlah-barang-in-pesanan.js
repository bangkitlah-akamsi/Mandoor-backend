/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('pesanan', {
    jumlah_barang: {
      type: 'INTEGER',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('pesanan', 'jumlah_barang');
};
