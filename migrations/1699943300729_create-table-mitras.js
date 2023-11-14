/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('mitras', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    email: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    mitraname: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    fullname: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    noktp: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    nomorwa: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    alamat: {
      type: 'TEXT',
      notNull: true,
    },
    profile: {
      type: 'TEXT',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('mitras');
};
