/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('barang', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    toko_id: {
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
    status_ketersediaan: {
      type: 'BOOL',
      notNull: true,
    },
  });
  // foreign key to toko
  pgm.addConstraint('barang', 'fk_barang.toko_id_toko.id', 'FOREIGN KEY(toko_id) REFERENCES toko(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
// menghapus constraint fk_notes.owner_users.id pada tabel notes
  pgm.dropConstraint('barang', 'fk_barang.toko_id_toko.id');
  pgm.dropTable('barang');
};
