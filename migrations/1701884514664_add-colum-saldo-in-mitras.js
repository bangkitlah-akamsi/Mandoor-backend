/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('mitras', {
    saldo: {
      type: 'INTEGER',
      notNull: false,
      defaultValue: 0,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('mitras', 'saldo');
};
