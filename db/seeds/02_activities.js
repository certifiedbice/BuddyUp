exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('activities')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('activities').insert([
        {
          title: 'Séance in the park',
          description:
            "I'll be holding a free séance in the park. Up to 3 people are welcome! Leave your WhatsApp, WeChat, or Snapchat and let's talk to some spirits!",
          zip_code: 12345,
          user_id: 19,
          start_time: '2020-10-20 15:00:00-00',
          end_time: '2020-10-20 16:00:00-00',
        },
        {
          title: 'Training partner needed',
          description:
            "I'll be training on local rooftops and would prefer to have a partner. Telegram app preferred for contact.",
          zip_code: 12345,
          user_id: 2,
          start_time: '2020-10-20 18:30:00-00',
          end_time: '2020-10-21 02:00:00-00',
        },
        {
          title: 'Mushi night (movie and sushi)',
          description:
            "My girlfriend and I are looking for couple friends, so we'd love for you to join us at the movies followed by a sushi restaurant. Couples only! WeChat preferred",
          zip_code: 12345,
          user_id: 4,
          start_time: '2020-10-25 12:00:00-00',
          end_time: '2020-10-25 13:00:00-00',
        },
        {
          title: 'Ska and hacky sack',
          description:
            "My friends just don't understand the beauty of ska or the joy of hacky sack. If you do, come enjoy both with me! Any messaging app is fine.",
          zip_code: 12345,
          user_id: 5,
          start_time: '2020-11-25 12:00:00-00',
          end_time: '2020-11-25 13:00:00-00',
        },
        {
          title: 'Hiking!',
          description:
            "The weather is supposed to be nice, so let's go for a hike! Skype or Snapchat preferred.",
          zip_code: 12345,
          user_id: 3,
          start_time: '2020-12-25 12:00:00-00',
          end_time: '2020-12-25 13:00:00-00',
        },
        {
          title: 'Swimming',
          description:
            "I'm going swimming in the river later! Any takers? Skype or Snapchat preferred.",
          zip_code: 12345,
          user_id: 19,
          start_time: '2020-12-25 12:00:00-00',
          end_time: '2020-12-25 13:00:00-00',
        },
      ]);
    });
};
