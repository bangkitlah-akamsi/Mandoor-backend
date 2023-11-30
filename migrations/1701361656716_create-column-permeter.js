/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('pesananhasskill', {
    permeter: {
      type: 'INTEGER',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('pesananhasskill', 'permeter');
};
