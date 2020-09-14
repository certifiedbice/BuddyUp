const knex=require('knex');
const jwt=require('jsonwebtoken');
const app=require('../src/app');
const helpers=require('./test-helpers');

describe('Auth Endpoints',function(){
	let db;
  	const {testUsers}=helpers.makeOrgsFixtures();
  	const testUser=testUsers[0];
  	before('make knex instance',()=>{
		db=knex({client:'pg',connection:process.env.TEST_DATABASE_URL});
		app.set('db', db);
  	});
  	after('disconnect from db',()=>db.destroy());
  	before('cleanup',()=>helpers.cleanTables(db));
  	afterEach('cleanup', () => helpers.cleanTables(db));
  	describe(`POST /api/auth/login`,()=>{
		beforeEach('insert users',()=>helpers.seedUsersTables(db,testUsers));
		const requiredFields=['email','password'];
		requiredFields.forEach(field=>{
			const loginAttemptBody={
				email:testUser.email,
				password:testUser.password,
			}
			it(`responds with 400 required error when '${field}' is missing`,()=>{
				delete loginAttemptBody[field];
				return supertest(app)
				.post('/api/auth/login')
				.send(loginAttemptBody)
				// This is tied directly to the commented code section in auth-router.
				// .expect(400,{error:`Missing '${field}' in request body`});
				.expect(400,{error:`Incorrect user_name or password`});
			});
			it(`responds 400 'invalid user_name or password' when bad user_name`,()=>{
				const userInvalidUser={email:'user-not',password:'existy'};
				return supertest(app)
				.post('/api/auth/login')
				.send(userInvalidUser)
				.expect(400,{error:`Incorrect user_name or password`});
			});
			it(`responds 400 'invalid user_name or password' when bad password`, () => {
				const userInvalidPass={email:testUser.email,password:'incorrect'};
				return supertest(app)
				.post('/api/auth/login')
				.send(userInvalidPass)
				.expect(400,{error:`Incorrect user_name or password`});
			});
			it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
				const userValidCreds={email:testUser.email,password:testUser.password};
				const expectedToken=jwt.sign(
					{user_id:testUser.id},process.env.JWT_SECRET,
				  	{
					  subject:testUser.email,
					  expiresIn:process.env.JWT_EXPIRY,
					  algorithm:'HS256'
					}
				);
				return supertest(app)
				.post('/api/auth/login')
				.send(userValidCreds)
				.expect(200,{authToken:expectedToken});
			});		
		});
  	});
});