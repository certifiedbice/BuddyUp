const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      username: 'shawn@psych.com',
      name: 'Shawn Spencer',
      password: 'Zippy$$93',
      zip_code: '93117',
      date_registered: '2020-08-07 15:21:25',
    },
    {
      username: 'red@hood.com',
      name: 'Jason Todd',
      password: 'Boopy##39',
      zip_code: '70032',
      date_registered: '2020-08-07 15:21:25',
    },
    {
      username: 'forgetfootball@mets.com',
      name: 'Tim Tebow',
      password: 'Jiffy%%76',
      zip_code: '11368',
      date_registered: '2020-08-07 15:21:25',
    },
    {
      username: 'fortuneteller@gmail.com',
      name: 'Crystal Ball',
      password: 'Puffy**21',
      zip_code: '60290',
      date_registered: '2020-08-07 15:21:25',
    },
    {
      username: 'no1diehardfan@gmail.com',
      name: 'Jake Peralta',
      password: 'rappy!!45',
      zip_code: '11215',
      date_registered: '2020-08-07 15:21:25',
    },
  ];
}

function makeActivitiesArray() {
  return [
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
  ];
}

function makeSignupsArray() {
  return [
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
  ];
}

function makeExpectedUser(user) {
  return {
    username: user.username,
    name: user.name,
    password: user.password,
    zip_code: user.zip_code,
    date_registered: user.date_registered,
  };
}

function makeExpectedActivity(activity) {
  return {
    title: activity.title,
    description: activity.description,
    zip_code: activity.zip_code,
    user_id: activity.user_id,
    start_time: activity.start_time,
    end_time: activity.end_time,
  };
}

function makeExpectedSignup(signup) {
  return {
    user_id: signup.user_id,
    activity_id: signup.activity_id,
    contact_info: signup.contact_info,
    is_approved: signup.is_approved,
  };
}

function makeNewActivity() {
  return {
    title: 'New Test Event',
    description: 'New Test Event description',
    zip_code: 12345,
    user_id: 1,
    start_time: '2020-09-20 15:00:00-00',
    end_time: '2020-09-20 16:00:00-00',
  };
}

function makeNewSignup() {
  return {
    user_id: 1,
    activity_id: 1,
    contact_info: 'New Contact Info',
    is_approved: false,
  };
}

function makeMaliciousActivity() {
  const maliciousActivity = {
    id: 911,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    zip_code: 12345,
    user_id: 1,
    start_time: '2020-09-20 15:00:00-00',
    end_time: '2020-09-20 16:00:00-00',
  };
  const expectedActivity = {
    ...maliciousActivity,
    title:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  };
  return {
    maliciousActivity,
    expectedActivity,
  };
}

function makeMaliciousSignup() {
  const maliciousSignup = {
    id: 911,
    user_id: '1',
    activity_id: '1',
    contact_info: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    is_approved: false,
  };
  const expectedSignup = {
    ...maliciousSignup,
    contact_info: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  };
  return {
    maliciousSignup,
    expectedSignup,
  };
}

function makeActivitiesFixtures() {
  const testUsers = makeUsersArray();
  const testActivities = makeActivitiesArray();
  const testSignups = makeSignupsArray(testUsers, testActivities);
  return { testUsers, testActivities, testSignups };
}

function makeSignupsFixtures() {
  const testUsers = makeUsersArray();
  const testActivities = makeActivitiesArray();
  const testSignups = makeSignupsArray(testUsers, testActivities);
  return { testUsers, testActivities, testSignups };
}

function cleanTables(db) {
  return db.transaction(
    (trx) =>
      trx.raw(
        `TRUNCATE
        signups,
        activites,
        users
			`
      )
    // .then(() =>
    //   Promise.all([
    //     trx.raw(
    //       `ALTER SEQUENCE organizations_id_seq minvalue 0 START WITH 1`
    //     ),
    //     trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
    //     trx.raw(`ALTER SEQUENCE comments_id_seq minvalue 0 START WITH 1`),
    //     trx.raw(`ALTER SEQUENCE endorsements_id_seq minvalue 0 START WITH 1`),
    //     trx.raw(`SELECT setval('organizations_id_seq', 0)`),
    //     trx.raw(`SELECT setval('users_id_seq', 0)`),
    //     trx.raw(`SELECT setval('comments_id_seq', 0)`),
    //     trx.raw(`SELECT setval('endorsements_id_seq', 0)`),
    //   ])
    // )
  );
}

function seedUsersTables(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db.into('users').insert(preppedUsers);
}

function seedActivitiesTable(db, activities) {
  return db.into('activities').insert(activities);
}

function seedSignupsTable(db, signups) {
  return db.into('signups').insert(signups);
}

function seedMaliciousActivity(db, activity) {
  return db.into('activities').insert([activity]);
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeActivitiesArray,
  makeSignupsArray,
  makeExpectedUser,
  makeExpectedActivity,
  makeExpectedSignup,
  makeNewActivity,
  makeNewSignup,
  makeMaliciousActivity,
  makeMaliciousSignup,
  makeActivitiesFixtures,
  makeSignupsFixtures,
  cleanTables,
  seedUsersTables,
  seedActivitiesTable,
  seedSignupsTable,
  seedMaliciousActivity,
  makeAuthHeader,
};
