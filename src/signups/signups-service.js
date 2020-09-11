'use strict';

const knex = require('../../db/knex');

const SignupsService = {
  getAll() {
    return knex('signups');
  },
  getAllForActivity(activity_id) {
    return knex('signups').where({ activity_id }).select('*');
  },
  getApprovedForActivity(activity_id) {
    return knex('signups')
      .where({ activity_id, is_approved: true })
      .select('*');
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
