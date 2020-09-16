'use strict';

const express = require('express');
const jsonBodyParser = express.json();

const ActivitiesService = require('./activities-service');
const { isValidActivity } = require('../../utils/isValidActivity');
const { requireAuth } = require('../middleware/jwt-auth');

const activitiesRouter = express.Router();

activitiesRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const userActivities = await ActivitiesService.getAllForUser(req.user.id);
    if (!userActivities)
      return res.status(404).json({
        error: `You don't have any activities`,
      });
    req.userActivities = userActivities;
    next();
  } catch (error) {
    next(error);
  }
});

activitiesRouter.get('/', async (req, res, next) => {
  try {
    res.status(200).json(req.userActivities);
    next();
  } catch (error) {
    next({ status: 500, message: error.message });
  }
});

activitiesRouter.get('/local', async (req, res, next) => {
  try {
    const localActivities = await ActivitiesService.getAllForZip(
      req.user.zip_code
    );

    res.status(200).json(localActivities);
    next();
  } catch (error) {
    next({ status: 500, message: error.message });
  }
});

activitiesRouter.post('/', jsonBodyParser, async (req, res, next) => {
  const { title, description, start_time, end_time } = req.body;

  const newActivity = {
    title,
    description,
    zip_code: req.user.zip_code,
    user_id: req.user.id,
    start_time,
    end_time,
  };

  if (!isValidActivity(newActivity))
    return next({
      status: 400,
      message: `An activity should include a title, description, ZIP code, start time, and end time`,
    });

  try {
    const activity = await ActivitiesService.create(newActivity);
    return res.status(201).json(activity);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

activitiesRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const activity = await ActivitiesService.getOne(id);

    if (!activity)
      return next({
        status: 404,
        message: `Unable to find activity with id ${id}`,
      });

    return res.status(200).json(activity);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

activitiesRouter.patch('/:id', jsonBodyParser, async (req, res, next) => {
  const { id } = req.params;

  try {
    const activity = await ActivitiesService.getOne(id);

    if (!activity)
      return next({
        status: 404,
        message: `Unable to update activity with id ${id}`,
      });

    if (activity.user_id !== req.user.id)
      return next({
        stats: 401,
        message: `You may not update activity belonging to another user`,
      });

    const updatedActivity = await ActivitiesService.update(id, req.body);
    console.log(activity);

    return res.status(200).json(updatedActivity);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

activitiesRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const activity = await ActivitiesService.getOne(id);

    if (!activity)
      return next({
        status: 404,
        message: `Unable to find activity with id ${id}`,
      });

    if (activity.user_id !== req.user.id)
      return next({
        stats: 401,
        message: `You may not delete activity belonging to another user`,
      });

    const deleted = await ActivitiesService.remove(id);

    return res.status(200).json(id);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

module.exports = activitiesRouter;
