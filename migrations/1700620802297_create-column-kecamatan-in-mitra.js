/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('mitras', {
    kecamatan: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    kota: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('mitras', 'kecamatan', 'kota');
};
