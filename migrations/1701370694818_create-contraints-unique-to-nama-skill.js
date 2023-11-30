/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint('skill', 'unique_nama_skill', 'UNIQUE(nama_skill)');
};

exports.down = (pgm) => {
  pgm.dropConstraint('skill', 'unique_nama_skill');
};
