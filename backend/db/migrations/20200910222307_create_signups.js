exports.up = function (knex) {
  return knex.schema.createTable('signups', (table) => {
    table.increments().primary().notNullable();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    table
      .integer('activity_id')
      .references('id')
      .inTable('activities')
      .notNullable()
      .onDelete('CASCADE');
    table.text('contact_info').notNullable();
    table.boolean('is_approved').defaultTo(true).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('signups');
};
