const knex = require('../db/knex');
const app=require('../src/app');
const helpers=require('./test-helpers');

describe('Activities Endpoints',function(){
	const {testUsers,testActivities}=helpers.makeActivitiesFixtures();
	before(() => {
		return knex.migrate.latest().then(() => knex.seed.run());
	});
	describe('GET /api/activities/',()=>{
		context(`Given activities`,()=>{
	  		it(`responds with 200`,()=>{
				return supertest(app)
		  		.get('/api/activities')
			  	.set('Authorization',helpers.makeAuthHeader(testUsers[0]))
		  		.expect(200);
	  		});
		});
	});
	describe('POST /api/activities/',()=>{
		context('Given activities',()=>{
			it('responds with 201',()=>{
				let expectedActivity=helpers.makeExpectedActivity(testActivities[0]);
				return supertest(app)
					.post(`/api/activities`)
					.set('Authorization',helpers.makeAuthHeader(testUsers[0]))
					.send(expectedActivity)
					.expect(201);
			});
		});
	});
	describe('GET /api/activities/:id',()=>{
		context(`Given no activities`,()=>{
	  		it(`responds with 500`,()=>{
				return supertest(app)
		  		.get('/api/activities/0')
			  	.set('Authorization',helpers.makeAuthHeader(testUsers[0]))
		  		.expect(500);
	  		});
		});
	});
	describe('PATCH /api/activities/:id',()=>{
		context(`Given activity`,()=>{
	  		it(`responds with 204`,()=>{
				return supertest(app)
		  		.patch('/api/activities/1')
			  	.set('Authorization',helpers.makeAuthHeader(testUsers[0]))
				.send({'title':'foobar'})
		  		.expect(204);
	  		});
		});
	});
	describe('DELETE /api/activities/:id',()=>{
		context(`Given activity`,()=>{
	  		it(`responds with 204`,()=>{
				return supertest(app)
		  		.delete('/api/activities/1')
			  	.set('Authorization',helpers.makeAuthHeader(testUsers[0]))
		  		.expect(204);
	  		});
		});
	});
	describe('GET /api/activities/local',()=>{
		context(`Given activities`,()=>{
	  		it(`responds with 200`,()=>{
				return supertest(app)
		  		.get('/api/activities/local')
			  	.set('Authorization',helpers.makeAuthHeader(testUsers[0]))
				.send({'user':{'zip_code':93117}})
		  		.expect(200);
	  		});
		});
	});
});