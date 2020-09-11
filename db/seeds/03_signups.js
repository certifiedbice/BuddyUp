exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('signups')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('signups').insert([
        {
          user_id: 1,
          activity_id: 2,
          contact_info: 'Test Contact Info',
          is_approved: true,
        },
        {
          user_id: 4,
          activity_id: 2,
          contact_info: 'Test Contact Info',
          is_approved: true,
        },
        {
          user_id: 2,
          activity_id: 1,
          contact_info: 'Test Contact Info',
          is_approved: false,
        },
        {
          user_id: 2,
          activity_id: 3,
          contact_info: 'Test Contact Info',
          is_approved: false,
        },
      ]);
    });
};
