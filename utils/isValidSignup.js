'use strict';

function isValidActivity(activity) {
  const { user_id, activity_id, contact_info, is_approved } = activity,
    hasUser = typeof user_id === 'number' && user_id % 1 === 0,
    hasActivity = typeof activity_id === 'number' && activity_id % 1 === 0,
    hasContact = typeof contact_info === 'string' && contact_info.length > 0,
    hasApproval = typeof is_approved === 'boolean';

  return hasUser && hasActivity && hasContact && hasApproval;
}

module.exports = { isValidActivity };
