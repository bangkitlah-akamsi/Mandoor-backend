/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('pesanan', {
    alamat: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('pesanan', 'alamat');
};
