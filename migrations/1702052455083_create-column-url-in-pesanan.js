/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('pesanan', {
    imageurl: {
      type: 'VARCHAR',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('pesanan', 'imageurl');
};
