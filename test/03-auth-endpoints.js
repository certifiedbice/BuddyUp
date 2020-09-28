const knex = require('../db/knex');//({pool: { min: 0, max: 7 }});;
const jwt=require('jsonwebtoken');
const app=require('../src/app');
const helpers=require('./test-helpers');
const config=require('../src/config');
describe('Auth Endpoints',function(){
  	const {testUsers}=helpers.makeActivitiesFixtures();
  	const testUser=testUsers[0];
  	before(()=>{return knex.migrate.latest().then(()=>knex.seed.run())});
	describe(`POST /api/auth/login`,()=>{
		const requiredFields=['username','password'];
		requiredFields.forEach(field=>{
			const loginAttemptBody={
				username:testUser.username,
				password:testUser.password,
			}
			it(`responds with 400 required error when '${field}' is missing`,()=>{
				delete loginAttemptBody[field];
				return supertest(app)
				.post('/api/auth/login')
				.send(loginAttemptBody)
				.expect(400,{error:`Incorrect username or password`});
			});
			it(`responds 400 'invalid user_name or password' when bad user_name`,()=>{
				const userInvalidUser={user_name:'user-not',password:'existy'};
				return supertest(app)
				.post('/api/auth/login')
				.send(userInvalidUser)
				.expect(400,{error:`Incorrect username or password`});
			});
			it(`responds 400 'invalid user_name or password' when bad password`, () => {
				const userInvalidPass={user_name:testUser.username,password:'incorrect'};
				return supertest(app)
				.post('/api/auth/login')
				.send(userInvalidPass)
				.expect(400,{error:`Incorrect username or password`});
			});
			it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
				const userValidCreds={username:testUser.username,password:testUser.password};
				const expectedToken=jwt.sign(
					{user_id:1},config.JWT_SECRET,
				  	{
					  subject:testUser.username,
					  expiresIn:config.JWT_EXPIRY,
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