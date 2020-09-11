require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');

const { NODE_ENV } = require('./config');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const signupsRouter = require('./signups/signups-router');
const activitiesRouter = require('./activities/activities-router');

const app = express();
const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/signups', signupsRouter);
app.use('/api/activities', activitiesRouter);

app.get('/', (_, res) => {
  res.send('BuddyUp API');
});
app.use(function errorHandler(error, _, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' };
  } else {
    console.error(error);
    response = { error: error.message, object: error };
  }
  res.status(500).json(response);
});
module.exports = app;
