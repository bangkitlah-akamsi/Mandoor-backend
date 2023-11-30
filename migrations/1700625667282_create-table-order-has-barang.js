/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('pesananhasbarang', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    pesanan_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    nama_barang: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    harga_barang: {
      type: 'INTEGER',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('pesananhasbarang');
};
