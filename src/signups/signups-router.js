'use strict';

const express = require('express');

const SignupsService = require('./signups-service');
const { isValidSignup } = require('../../utils/isValidSignup');

const signupsRouters = express.Router();

signupsRouters.get('/', async (_, res, next) => {
  try {
    const signups = await SignupsService.getAll();

    if (!signups)
      return next({
        status: 404,
        message: `No signups found`,
      });

    return res.status(200).json(signups);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

signupsRouters.post('/', async (req, res, next) => {
  const { user_id, activity_id, contact_info, is_approved } = req.body;
  const newSignup = {
    user_id,
    activity_id,
    contact_info,
    is_approved,
  };

  if (!isValidSignup(newSignup))
    return next({
      status: 400,
      message: `An signup should include a user ID, activity ID, contact info, and is_approved boolean`,
    });

  try {
    const signup = await SignupsService.create(newSignup);
    return res.status(201).json(signup);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

signupsRouters.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const signup = await SignupsService.getOne(id);

    if (!signup)
      return next({
        status: 404,
        message: `Unable to find signup with id ${id}`,
      });

    return res.status(200).json(signup);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

signupsRouters.patch('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const signup = await SignupsService.update(id, req.body);
    console.log(signup);

    if (!signup)
      return next({
        status: 404,
        message: `Unable to update signup with id ${id}`,
      });

    return res.status(200).json(signup);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

signupsRouters.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const signup = await SignupsService.remove(id);

    if (!signup)
      return next({
        status: 404,
        message: `Unable to find signup with id ${id}`,
      });

    return res.status(200).json(id);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

module.exports = signupsRouters;
