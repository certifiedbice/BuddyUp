'use strict';

const knex = require('../../db/knex');

const SignupsService = {
  getAll() {
    return knex('signups')
      .join('users', 'signups.user_id', '=', 'users.id')
      .select(
        'signups.id',
        knex.ref('users.name').as('user_name'),
        'signups.activity_id',
        'signups.contact_info',
        'is_approved'
      );
  },
  getAllForUser(user_id) {
    return knex('signups')
      .where({ user_id })
      .join('users', 'signups.user_id', '=', 'users.id')
      .select(
        'signups.id',
        knex.ref('users.name').as('user_name'),
        'signups.activity_id',
        'signups.contact_info',
        'is_approved'
      );
  },
  getAllForActivity(activity_id) {
    return knex('signups')
      .where({ activity_id })
      .join('users', 'signups.user_id', '=', 'users.id')
      .select(
        'signups.id',
        knex.ref('users.name').as('user_name'),
        'signups.activity_id',
        'signups.contact_info',
        'is_approved'
      );
  },
  getApprovedForActivity(activity_id) {
    return knex('signups')
      .where({ activity_id, is_approved: true })
      .join('users', 'signups.user_id', '=', 'users.id')
      .select(
        'signups.id',
        knex.ref('users.name').as('user_name'),
        'signups.activity_id',
        'signups.contact_info',
        'is_approved'
      );
  },
  getOne(id) {
    return knex('signups')
      .where('signups.id', id)
      .join('users', 'signups.user_id', '=', 'users.id')
      .first(
        'signups.id',
		'user_id',
        knex.ref('users.name').as('user_name'),
        'signups.activity_id',
        'signups.contact_info',
        'is_approved'
      );
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
