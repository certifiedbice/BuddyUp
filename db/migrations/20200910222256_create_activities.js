exports.up = function (knex) {
  return knex.schema.createTable('activities', (table) => {
    table.increments().notNullable();
    table.text('title').notNullable();
    table.text('description').notNullable();
    table.integer('zip_code').notNullable();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.timestamp('start_time').notNullable();
    table.timestamp('end_time').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('activities');
};
