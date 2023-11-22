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
    barang_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('pesananhasbarang', 'fk_pesanan_has_barang.barang_id_barang.id', 'FOREIGN KEY(barang_id) REFERENCES barang(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('pesananhasbarang', 'fk_pesanan_has_barang.barang_id_barang.id');
  pgm.dropTable('pesananhasbarang');
};
