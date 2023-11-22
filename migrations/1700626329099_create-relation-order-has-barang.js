/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint('pesananhasbarang', 'fk_pesanan_has_barang.pesanan_id_pesanan.id', 'FOREIGN KEY(pesanan_id) REFERENCES pesanan(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('pesananhasbarang', 'fk_pesanan_has_barang.pesanan_id_pesanan.id');
};
