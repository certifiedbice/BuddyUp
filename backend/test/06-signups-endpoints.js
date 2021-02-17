const knex = require('../db/knex');
const app=require('../src/app');
const helpers=require('./test-helpers');

describe('Signups Endpoints',function(){
	const {testUsers,testSignups}=helpers.makeActivitiesFixtures();
	before(()=>{return knex.migrate.latest().then(()=>knex.seed.run());});
	describe('GET /api/signups/',()=>{
		context(`Given no signups`,()=>{
	  		it(`responds with 500`,()=>{
				return supertest(app)
		  		.get('/api/signups/0')
			  	.set('Authorization',helpers.makeAuthHeader(testUsers[0]))
		  		.expect(500);
	  		});
		});
	});
	describe('GET /api/signups/',()=>{
		context(`Given signups`,()=>{
	  		it(`responds with 200`,()=>{
				return supertest(app)
		  		.get('/api/signups')
			  	.set('Authorization',helpers.makeAuthHeader(testUsers[0]))
		  		.expect(200);
	  		});
		});
	});
	describe('GET /api/signups/:id',()=>{
		context(`Given signups`,()=>{
	  		it(`responds with 200`,()=>{
				return supertest(app)
		  		.get('/api/signups/1')
			  	.set('Authorization',helpers.makeAuthHeader(testUsers[0]))
		  		.expect(200);
	  		});
		});
	});
	describe('PATCH /api/signups/:id',()=>{
		context(`Given signups`,()=>{
	  		it(`responds with 204`,()=>{
				return supertest(app)
		  		.patch('/api/signups/1')
			  	.set('Authorization',helpers.makeAuthHeader(testUsers[0]))
				.send({'contact_info':'twatter'})
		  		.expect(204);
	  		});
		});
	});
	describe('DELETE /api/signups/:id',()=>{
		context(`Given signups`,()=>{
	  		it(`responds with 200`,()=>{
				return supertest(app)
		  		.get('/api/signups/1')
			  	.set('Authorization',helpers.makeAuthHeader(testUsers[0]))
		  		.expect(200);
	  		});
		});
	});
	describe('GET /api/signups/approved',()=>{
		context(`Given signups`,()=>{
	  		it(`responds with 200`,()=>{
				return supertest(app)
		  		.get('/api/signups/approved')
			  	.set('Authorization',helpers.makeAuthHeader(testUsers[0]))
				.send({'activity_id':1})
		  		.expect(200);
	  		});
		});
	});
	describe('PATCH /api/signups/approval/:id',()=>{
		context(`Given signups`,()=>{
	  		it(`responds with 204`,()=>{
				return supertest(app)
		  		.patch('/api/signups/approval/1')
			  	.set('Authorization',helpers.makeAuthHeader(testUsers[1]))
				.expect(204);
	  		});
		});
	});
});