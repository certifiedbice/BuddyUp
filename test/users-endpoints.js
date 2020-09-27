const knex = require('../db/knex');
const bcrypt=require('bcryptjs');
const app=require('../src/app');
const AuthService=require('../src/auth/auth-service');
const helpers=require('./test-helpers');
describe('Users Endpoints',function(){
	const {testUsers}=helpers.makeActivitiesFixtures();
	const testUser=testUsers[0];
	before(()=>{return knex.migrate.latest().then(()=>knex.seed.run());});
	describe(`POST /api/users`,()=>{
		context(`User Validation`,()=>{
			const requiredFields=['username','name','password','zip_code'];
			requiredFields.forEach(field=>{
				const registerAttemptBody={
					username:'test_user_name',
					name:'john',
					password:'test-password',
					zip_code:'77889'
				};
				it(`responds with 400 required error when '${field}' is missing`,()=>{
					delete registerAttemptBody[field];
					return supertest(app)
					.post('/api/users')
					.send(registerAttemptBody)
					.expect(400,{error:`Missing '${field}' in request body`});
				});
				it(`responds 400 'Password must be longer than 8 characters' when empty password`,()=>{
					const userShortPassword={
						username:testUser.username,
						name:testUser.name,
						password:'1234567',
						zip_code:testUser.zip_code
					};
					return supertest(app)
					.post('/api/users')
					.send(userShortPassword)
					.expect(400,{error:`Password must be longer than 8 characters`});
				});
				it(`responds 400 'Password must be less than 72 characters' when long password`,()=>{
					const userLongPassword={
						username:testUser.username,
						name:testUser.name,
						password:'*'.repeat(73),
						zip_code:testUser.zip_code
					};
					return supertest(app)
					.post('/api/users')
					.send(userLongPassword)
					.expect(400,{error:`Password must be less than 72 characters`});
				});
				it(`responds 400 error when password starts with spaces`,()=>{
					const userPasswordStartsSpaces={
						username:testUser.username,
						name:testUser.name,
						password:' 1Aa!2Bb@',
						zip_code:testUser.zip_code
					};
					return supertest(app)
					.post('/api/users')
					.send(userPasswordStartsSpaces)
					.expect(400,{error:`Password must not start or end with empty spaces`});
				});
				it(`responds 400 error when password ends with spaces`,()=>{
					const userPasswordEndsSpaces={
						username:testUser.username,
						name:testUser.name,
						password:'1Aa!2Bb@ ',
						zip_code:testUser.zip_code
					};
					return supertest(app)
					.post('/api/users')
					.send(userPasswordEndsSpaces)
					.expect(400,{error:`Password must not start or end with empty spaces`});
				});
				it(`responds 400 error when password isn't complex enough`,()=>{
					const userPasswordNotComplex={
						username:testUser.username,
						name:testUser.name,
						password:'11AAaabb',
						zip_code:testUser.zip_code
					};
					return supertest(app)
					.post('/api/users')
					.send(userPasswordNotComplex)
					.expect(400,{error:`Password must contain 1 upper case, lower case, number and special character`});
				});
				it(`responds 400 'Username already taken' when username isn't unique`,()=>{
					const duplicateUser={
						username:testUser.username,
						name:testUser.name,
						password:'11AAaa!!',
						zip_code:testUser.zip_code
					};
					return supertest(app)
					.post('/api/users')
					.send(duplicateUser)
					.expect(400,{error:`Username already taken`});
				});
			});
		});
	});
	describe(`GET /api/users/:id`,()=>{
		context(`Given the user doesn\'t exist`,()=>{
	  		it(`responds with 500 and user doesn\'t exist`,()=>{
				return supertest(app)
		  		.get('/api/users/0')
		  		.expect(500,`{"error":"Unable to find user with id 0","object":{"status":404,"message":"Unable to find user with id 0"}}`);
	  		});
		});
		context('Given there are users in the database',()=>{
			it('responds with 200 and the specified user',()=>{
				return supertest(app)
					.get(`/api/users/19`)
					.expect(200);
			});
		});
	});
});