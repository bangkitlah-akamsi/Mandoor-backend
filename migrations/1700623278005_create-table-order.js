/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('pesanan', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    mitra_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    kecamatan_user: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    kota_user: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    kecamatan_mitra: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    kota_mitra: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    total_barang: {
      type: 'INTEGER',
      notNull: true,
    },
    harga_skill: {
      type: 'INTEGER',
      notNull: true,
    },
    transport: {
      type: 'INTEGER',
      notNull: true,
    },
    total: {
      type: 'INTEGER',
      notNull: true,
    },
    status_order: {
      type: 'VARCHAR(15)',
      notNull: true,
    },
  });

  pgm.addConstraint('pesanan', 'fk_pesanan.mitra_id_mitras.id', 'FOREIGN KEY(mitra_id) REFERENCES mitras(id) ON DELETE CASCADE');
  pgm.addConstraint('pesanan', 'fk_pesanan.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('pesanan', 'fk_pesanan.mitra_id_mitras.id');
  pgm.dropConstraint('pesanan', 'fk_pesanan.user_id_users.id');
  pgm.dropTable('pesanan');
};
