/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('pesananhasskill', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    pesanan_id: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    skill_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('pesananhasskill', 'fk_pesanan_has_skill.skill_id_skill.id', 'FOREIGN KEY(skill_id) REFERENCES skill(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('pesananhasskill', 'fk_pesanan_has_skill.skill_id_skill.id');
  pgm.dropTable('pesananhasskill');
};
