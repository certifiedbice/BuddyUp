exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary().notNullable();
    table.text('username').notNullable();
    table.text('name').notNullable();
    table.text('password').notNullable();
    table.integer('zip_code').notNullable();
    table.timestamp('date_registered').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
