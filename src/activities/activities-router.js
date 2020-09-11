'use strict';

const express = require('express');

const ActivitiesService = require('./activities-service');
const { isValidActivity } = require('../../utils/isValidActivity');

const activitiesRouter = express.Router();

activitiesRouter.get('/', async (_, res, next) => {
  try {
    const activities = await ActivitiesService.getAll();

    if (!activities)
      return next({
        status: 404,
        message: `No activities found`,
      });

    return res.status(200).json(activities);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

activitiesRouter.post('/', async (req, res, next) => {
  const {
    title,
    description,
    zip_code,
    user_id,
    start_time,
    end_time,
  } = req.body;
  const newActivity = {
    title,
    description,
    zip_code,
    user_id,
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

activitiesRouter.patch('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const activity = await ActivitiesService.update(id, req.body);
    console.log(activity);

    if (!activity)
      return next({
        status: 404,
        message: `Unable to update activity with id ${id}`,
      });

    return res.status(200).json(activity);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

activitiesRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const activity = await ActivitiesService.remove(id);

    if (!activity)
      return next({
        status: 404,
        message: `Unable to find activity with id ${id}`,
      });

    return res.status(200).json(id);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

module.exports = activitiesRouter;
