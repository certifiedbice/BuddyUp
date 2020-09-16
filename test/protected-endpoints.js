const knex = require('../db/knex');
const app=require('../src/app');
const helpers=require('./test-helpers');

before(() => {
	return knex.migrate.latest().then(() => knex.seed.run());
});

describe.only(`Protected endpoints`,()=>{
	const protectedEndpoints=[
		// {
		// 	name:'POST /api/signups',
		// 	path:'/api/signups',
  		// 	method:supertest(app).get
		// },
		// {
		// 	name:'POST /api/signups/approved',
		// 	path:'/api/signups/approved',
  		// 	method:supertest(app).post
		// },
		{
			name:'POST /api/activities',
			path:'/api/activities',
  			method:supertest(app).post
		},
		{
			name:'POST /api/activities/:id',
			path:'/api/activities/:id',
  			method:supertest(app).post
		},
		{
  			name:'POST /api/auth/refresh',
  			path:'/api/auth/refresh',
  			method:supertest(app).post
		}
	];
	protectedEndpoints.forEach(endpoint=>{
		describe(endpoint.name,()=>{
			it('should return 401 \'Missing bearer token\' when missing bearer token',()=>{
				return endpoint.method(endpoint.path)
					.expect(401,{error:'Missing bearer token'});
			});
			it(`responds 401 'Unauthorized request' when invalid JWT secret`,()=>{
				const userNoCreds={username:'',password:''};
				return endpoint.method(endpoint.path)
					.set('Authorization',helpers.makeAuthHeader(userNoCreds))
					.expect(401,{error:'Unauthorized request'});
			});
			it('should return 401 \'Unauthorized request\' when invalid sub in payload',()=>{
				const invalidUser={username:'badUser',password:''};
				return endpoint.method(endpoint.path)
					.set('Authorization',helpers.makeAuthHeader(invalidUser))
					.expect(401,{error:'Unauthorized request'});
			});
		});
	});
});