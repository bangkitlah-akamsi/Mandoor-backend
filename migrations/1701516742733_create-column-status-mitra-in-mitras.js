/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('mitras', {
    status_mitra: {
      type: 'BOOLEAN',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('mitras', 'status_mitra');
};
