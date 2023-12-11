/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('skillhasitem', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    skill_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    item: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
  });

  pgm.addConstraint('skillhasitem', 'fk_skillhasitem.skill_id_skill.id', 'FOREIGN KEY(skill_id) REFERENCES skill(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('skillhasitem', 'fk_skillhasitem.skill_id_skill.id');
  pgm.dropTable('skillhasitem');
};
