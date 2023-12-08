/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('pesanan', {
    nomorwa_user: {
      type: 'VARCHAR(20)',
      notNull: false,
    },
    nomorwa_mitra: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('pesanan', 'nomorwa_user');
  pgm.dropColumn('pesanan', 'nomorwa_mitra');
};
