const { getMaxListeners } = require('./app');
module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgresql://buddyup:buddyup@localhost/buddyup',
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    'postgresql:/buddyup:buddyup@localhost/buddyup-test',
  JWT_SECRET:'im so lonely',
//   JWT_SECRET: process.env.JWT_SECRET || 'im so lonely',
//   JWT_EXPIRY:'3h',
  JWT_EXPIRY:'3h',
};
