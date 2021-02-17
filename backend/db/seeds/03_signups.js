exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('signups')
    .del()
    .then(function () {
		return knex.raw('ALTER SEQUENCE signups_id_seq RESTART WITH 1')
	})
	.then(function () {
      // Inserts seed entries
      return knex('signups').insert([
        {
          user_id: 1,
          activity_id: 2,
          contact_info: 'Telegram: AmazingPsychMan',
          is_approved: true,
        },
        {
          user_id: 4,
          activity_id: 2,
          contact_info: 'Telegram: BuyKriegerrands',
          is_approved: true,
        },
        {
          user_id: 6,
          activity_id: 1,
          contact_info: 'Snapchat: JoeDemo',
          is_approved: false,
        },
        {
          user_id: 2,
          activity_id: 5,
          contact_info: 'Snapchat: BatmanIsAChump',
          is_approved: false,
        },
        {
          user_id: 1,
          activity_id: 5,
          contact_info: 'Snapchat: AmazingPsychMan',
          is_approved: true,
        },
        {
          user_id: 6,
          activity_id: 2,
          contact_info: 'Telegram: JoeDemo',
          is_approved: false,
        },
        {
          user_id: 6,
          activity_id: 3,
          contact_info: 'WeChat: JoeDemo',
          is_approved: true,
        },
      ]);
    });
};
