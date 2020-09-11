exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('activities')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('activities').insert([
        {
          title: 'Test Event 1',
          description: 'Test event description 1',
          zip_code: 12345,
          user_id: 1,
          start_time: '2020-09-20 15:00:00-00',
          end_time: '2020-09-20 16:00:00-00',
        },
        {
          title: 'Test Event 2',
          description: 'Test event description 2',
          zip_code: 12345,
          user_id: 2,
          start_time: '2020-09-20 17:30:00-00',
          end_time: '2020-09-20 20:00:00-00',
        },
        {
          title: 'Test Event 3',
          description: 'Test event description 3',
          zip_code: 12345,
          user_id: 1,
          start_time: '2020-09-25 12:00:00-00',
          end_time: '2020-09-25 13:00:00-00',
        },
      ]);
    });
};
