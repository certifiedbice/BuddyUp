'use strict';

const knex = require('../../db/knex');

const SignupsService = {
  getAll() {
    return knex('signups');
  },
  getAllForUser(user_id) {
    return knex('signups').where({ user_id }).select('*');
  },
  getAllForActivity(activity_id) {
    return knex('signups')
      .where({ activity_id })
      .join('users', 'signups.user_id', '=', 'users.id')
      .select('users.name', 'signups.activity_id', 'signups.contact_info');
  },
  getApprovedForActivity(activity_id) {
    return knex('signups')
      .where({ activity_id, is_approved: true })
      .join('users', 'signups.user_id', '=', 'users.id')
      .select('users.name', 'signups.activity_id', 'signups.contact_info');
  },
  getOne(id) {
    return knex('signups').where({ id }).first('*');
  },
  create(signup) {
    return knex('signups')
      .insert(signup)
      .returning('*')
      .then((rows) => rows[0]);
  },
  update(id, signup) {
    return knex('signups').where({ id }).update(signup);
  },
  remove(id) {
    return knex('signups').where({ id }).delete();
  },
};

module.exports = SignupsService;
