/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('skill', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    nama_skill: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    harga_skill: {
      type: 'INTEGER',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('skill');
};
