const knex=require('knex');
const app=require('../src/app');
const helpers=require('./test-helpers');

describe('Organizations Endpoints',function(){
	let db;
	const {testUsers,testOrgs,testComments}=helpers.makeOrgsFixtures();

	before('make knex instance',()=>{
		db=knex({client:'pg',connection:process.env.TEST_DATABASE_URL});
		app.set('db', db);
	});

	after('disconnect from db',()=>db.destroy());

	before('cleanup',()=>helpers.cleanTables(db));

	afterEach('cleanup',()=>helpers.cleanTables(db));

	describe(`Protected endpoints`,()=>{
		const protectedEndpoints=[
			{
				name:'POST /api/orgs/submit-org',
				path:'/api/orgs/submit-org',
      			method:supertest(app).post
			},
			{
				name:'POST /api/orgs/:orgId/endorsements',
				path:'/api/orgs/:orgId/endorsements',
      			method:supertest(app).post
			},
			{
				name:'POST /api/orgs/:orgId/comments',
				path:'/api/orgs/:orgId/comments',
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
					const userNoCreds={email:'',password:''};
					return endpoint.method(endpoint.path)
						.set('Authorization',helpers.makeAuthHeader(userNoCreds))
						.expect(401,{error:'Unauthorized request'});
				});
				it('should return 401 \'Unauthorized request\' when invalid sub in payload',()=>{
					const invalidUser={email:'badUser',password:''};
					return endpoint.method(endpoint.path)
						.set('Authorization',helpers.makeAuthHeader(invalidUser))
						.expect(401,{error:'Unauthorized request'});
				});
			});
		});
	});
});