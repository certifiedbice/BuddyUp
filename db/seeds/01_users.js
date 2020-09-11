exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'shawn@psych.com',
          name: 'Shawn Spencer',
          password:
            '$2a$12$rBPNvTQEbYVNp2/pIzKFJO4f8NlYSSDwpnwl2yMjBj6RoVDDmGgYa', // unhashed: Zippy$$93
          zip_code: '93117',
        },
        {
          username: 'red@hood.com',
          name: 'Jason Todd',
          password:
            '$2a$12$53ej0UFI63pcZBbGWQwSlO617ABjGWc3/v3P6XKbuiLWSF6BQ88Iu', // unhashed: Boopy##39
          zip_code: '70032',
        },
        {
          username: 'forgetfootball@mets.com',
          name: 'Tim Tebow',
          password:
            '$2a$12$a2lwO1B9Y3c74BzkNORfsu/C00e8IR51lQPwXSKQ.5gcY9j3e1jfi', // unhashed: Jiffy%%76
          zip_code: '11368',
        },
        {
          username: 'fortuneteller@gmail.com',
          name: 'Crystal Ball',
          password:
            '$2a$12$mkmyCkhCimVhctVH6c2dD.yZ.ELrdlXRpeTkR6.3Ci35ox0.xl1Jy', // unhashed: Puffy**21
          zip_code: '60290',
        },
        {
          username: 'no1diehardfan@gmail.com',
          name: 'Jake Peralta',
          password:
            '$2a$12$p2OVQBrQwpoAr355AKGI9ewidvGeIxr86FOPU8QxHLvgrx5fFxTnq', // unhashed: rappy!!45
          zip_code: '11215',
        },
      ]);
    });
};
