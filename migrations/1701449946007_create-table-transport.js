/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('transport', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    kecamatan_user: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    kecamatan_mitra: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    jarak: {
      type: 'FLOAT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('transport');
};
