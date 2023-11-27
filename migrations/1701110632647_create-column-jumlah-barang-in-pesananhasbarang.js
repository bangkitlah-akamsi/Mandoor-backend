/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('pesananhasbarang', {
    jumlah_barang: {
      type: 'INTEGER',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('pesanahasbarang', 'jumlah_barang');
};
