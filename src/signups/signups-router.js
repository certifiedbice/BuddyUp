'use strict';

const express = require('express');
const jsonBodyParser = express.json();

const SignupsService = require('./signups-service');
const { isValidSignup } = require('../../utils/isValidSignup');

const signupsRouter = express.Router();

signupsRouter.get('/', jsonBodyParser, async (req, res, next) => {
  try {
    const signups = req.body.activity_id
      ? await SignupsService.getAllForActivity(req.body.activity_id)
      : await SignupsService.getAll();

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

signupsRouter.get('/approved', jsonBodyParser, async (req, res, next) => {
  try {
    if (!req.body.activity_id)
      return next({
        status: 400,
        message: 'Activity ID required in request body',
      });

    const { activity_id } = req.body;
    const signups = await SignupsService.getApprovedForActivity(activity_id);

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

signupsRouter.post('/', jsonBodyParser, async (req, res, next) => {
  const { user_id, activity_id, contact_info } = req.body;
  const newSignup = {
    user_id,
    activity_id,
    contact_info,
    is_approved: false,
  };

  if (!isValidSignup(newSignup))
    return next({
      status: 400,
      message: `An signup should include a user ID, activity ID, and contact info.`,
    });

  try {
    const signup = await SignupsService.create(newSignup);
    return res.status(201).json(signup);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

signupsRouter.get('/:id', async (req, res, next) => {
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

signupsRouter.patch('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const signup = await SignupsService.update(id, req.body);
    console.log(req.body);
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

signupsRouter.delete('/:id', async (req, res, next) => {
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

module.exports = signupsRouter;
