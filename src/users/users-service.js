const xss = require('xss');
const bcrypt = require('bcryptjs');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const knex = require('../../db/knex');
const AuthService = require('../auth/auth-service');

const UsersService = {
  getOne(id) {
    return knex('users')
      .select('username', 'name', 'zip_code', 'date_registered')
      .where({ id })
      .first();
  },
  hasUserWithUserName(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then((user) => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character';
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      username: xss(user.username),
      name: xss(user.name),
      password: {
        authToken: AuthService.createJwt(user.username, { user_id: user.id }),
      },
      zip_code: xss(user.zip_code),
      date_registered: new Date(user.date_registered),
    };
  },
};

module.exports = UsersService;
