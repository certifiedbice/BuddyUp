const { expect } = require('chai'),
  supertest = require('supertest'),
  app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "BuddyUp API"', () => {
    return supertest(app).get('/').expect(200, 'BuddyUp API');
  });
});
