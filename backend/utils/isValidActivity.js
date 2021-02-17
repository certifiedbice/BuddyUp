'use strict';

function isValidActivity(activity) {
  const {
    title,
    description,
    zip_code,
    user_id,
    start_time,
    end_time,
  } = activity;
  const hasTitle = typeof title === 'string' && title.length > 0;
  const hasDescription =
    typeof description === 'string' && description.length > 0;
  const hasZip =
    typeof zip_code === 'number' &&
    zip_code.toString().length === 5 &&
    zip_code % 1 === 0;
  const hasUser = typeof user_id === 'number' && user_id % 1 === 0;
  const hasStart = typeof start_time === 'string' && start_time.length > 0;
  const hasEnd = typeof end_time === 'string' && end_time.length > 0;

  return hasTitle && hasDescription && hasZip && hasUser && hasStart && hasEnd;
}

module.exports = { isValidActivity };
