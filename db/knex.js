'use strict';

// const { attachPaginate } = require('knex-paginate');
// attachPaginate();

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
module.exports = require('knex')(config);
