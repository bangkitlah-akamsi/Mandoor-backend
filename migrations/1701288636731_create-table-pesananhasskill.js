/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('mitrahasskill', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    mitra_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    skill_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('mitrahasskill', 'fk_mitra_has_skill.mitra_id_mitras.id', 'FOREIGN KEY(mitra_id) REFERENCES mitras(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('mitrahasskill', 'fk_mitra_has_skill.mitra_id_mitras.id');
  pgm.dropTable('mitrahasskill');
};
