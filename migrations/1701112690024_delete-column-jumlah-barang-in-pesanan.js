/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumn('pesanan', 'jumlah_barang');
};

exports.down = (pgm) => {
  pgm.addColumn('pesanan', {
    jumlah_barang: {
      type: 'INTEGER',
      notNull: false,
    },
  });
};
