'use strict';

const knex = require('../../db/knex');

const ActivitiesService = {
  getAll() {
    return knex('activities');
  },
  getAllForZip(zip_code) {
    return knex('activities').where({ zip_code }).select('*');
  },
  getAllForUser(user_id) {
    return knex('activities').where({ user_id }).select('*');
  },
  getOne(id) {
    return knex('activities').where({ id }).first('*');
  },
  create(activity) {
    return knex('activities')
      .insert(activity)
      .returning('*')
      .then((rows) => rows[0]);
  },
  update(id, activity) {
    return knex('activities').where({ id }).update(activity);
  },
  remove(id) {
    return knex('activities').where({ id }).delete();
  },
};

module.exports = ActivitiesService;
