'use strict';

const express = require('express');
const jsonBodyParser = express.json();

const SignupsService = require('./signups-service');
const ActivitiesService = require('../activities/activities-service');
const { isValidSignup } = require('../../utils/isValidSignup');
const { requireAuth } = require('../middleware/jwt-auth');

const signupsRouter = express.Router();

signupsRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const userSignups = await SignupsService.getAllForUser(req.user.id);
    if (!userSignups)
      return res.status(404).json({
        error: `You don't have any activities`,
      });
    req.userSignups = userSignups;
    next();
  } catch (error) {
    next(error);
  }
});

signupsRouter.get('/', jsonBodyParser, async (req, res, next) => {
  console.log(req.query);
  try {
    const activity = !isNaN(req.query.activity_id)
      ? await ActivitiesService.getOne(req.query.activity_id)
      : null;

    if (typeof activity !== 'object' && activity.user_id !== req.user.id)
      return next({
        status: 401,
        message: `Unauthorized: This activity belongs to another user.`,
      });

    const signups = !isNaN(req.query.activity_id)
      ? await SignupsService.getAllForActivity(req.query.activity_id)
      : await SignupsService.getAllForUser(req.user.id);

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

signupsRouter.patch('/approval/:id', jsonBodyParser, async (req, res, next) => {
  const { id } = req.params;

  try {
    const signup = await SignupsService.getOne(id);
    const activity = await ActivitiesService.getOne(signup.activity_id);

    if (!signup){
      return next({
        status: 404,
        message: `Unable to find signup with id ${id}.`,
      });
	}
    if (activity.user_id !== req.user.id){
		
      return next({
        status: 401,
        message: `You may not approve signups to activities owned by another user.`,
      });
	}
    const isApproved = !signup.is_approved;

    await SignupsService.update(id, { is_approved: isApproved });

    return res.status(204).send();
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
    const activity = await ActivitiesService.getOne(activity_id);

    if (activity.user_id !== req.user.id)
      return next({
        status: 401,
        message: `Unauthorized: This activity belongs to another user.`,
      });

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
  const { activity_id, contact_info } = req.body;
  const newSignup = {
    user_id: req.user.id,
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

    if (!signup){
      return next({
        status: 404,
        message: `Unable to find signup with id ${id}`,
      });
	}
    return res.status(200).json(signup);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

signupsRouter.patch('/:id', jsonBodyParser, async (req, res, next) => {
  const { id } = req.params;
  try {
    if (req.body.is_approved){
      return next({
        status: 401,
        message: `Unauthorized: Users may not approve themselves.`,
      });
	}
    const signup = await SignupsService.getOne(id);
    if (!signup){
      return next({
        status: 404,
        message: `Unable to find signup with id ${id}.`,
      });
	}
    if (signup.user_id !== req.user.id){
      return next({
        status: 401,
        message: `You may not update a signup owned by another user.`,
      });
	}
    await SignupsService.update(id, req.body);

    return res.status(204).send();
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

signupsRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const signup = await SignupsService.getOne(id);

    if (!signup)
      return next({
        status: 404,
        message: `Unable to find signup with id ${id}`,
      });

    if (signup.user_id !== req.user.id)
      return next({
        status: 401,
        message: `You may not delete a signup owned by another user.`,
      });

    await SignupsService.remove(id);

    return res.status(204).send();
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

module.exports = signupsRouter;
