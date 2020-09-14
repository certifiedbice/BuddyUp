const knex=require('knex');
const bcrypt=require('bcryptjs');
const app=require('../src/app');
const AuthService=require('../src/auth/auth-service');
const helpers=require('./test-helpers');

describe.only('Users Endpoints',function(){
	let db;
	const {testUsers}=helpers.makeOrgsFixtures();
	const testUser=testUsers[0];

	before('make knex instance',()=>{
		db=knex({client:'pg',connection:process.env.TEST_DATABASE_URL});
		app.set('db',db);
	});

	after('disconnect from db',()=>db.destroy());

	before('cleanup',()=>helpers.cleanTables(db));

	afterEach('cleanup',()=>helpers.cleanTables(db));

	describe(`POST /api/users`,()=>{
		context(`User Validation`,()=>{
			beforeEach('insert users',()=>helpers.seedUsersTables(db,testUsers));
			const requiredFields=['username','f_name','l_name','password','email','city','user_state','zipcode'];

			requiredFields.forEach(field=>{
				const registerAttemptBody={
					username:'test_user_name',
					f_name:'john',
					l_name:'doe',
					password:'test-password',
					email:'johndoe@johndoe.com',
					city:'tampa',
					user_state:'FL',
					zipcode:'77889'
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
						f_name:testUser.f_name,
						l_name:testUser.l_name,
						password:'1234567',
						email:testUser.email,
						city:testUser.city,
		  				user_state:testUser.user_state,
						zipcode:testUser.zipcode
					};
					return supertest(app)
					.post('/api/users')
					.send(userShortPassword)
					.expect(400,{error:`Password must be longer than 8 characters`});
				});
				it(`responds 400 'Password must be less than 72 characters' when long password`,()=>{
					const userLongPassword={
						username:testUser.username,
						f_name:testUser.f_name,
						l_name:testUser.l_name,
						password:'*'.repeat(73),
						email:testUser.email,
						city:testUser.city,
		  				user_state:testUser.user_state,
						zipcode:testUser.zipcode
					};
					return supertest(app)
					.post('/api/users')
					.send(userLongPassword)
					.expect(400,{error:`Password must be less than 72 characters`});
				});
				it(`responds 400 error when password starts with spaces`,()=>{
					const userPasswordStartsSpaces={
						username:testUser.username,
						f_name:testUser.f_name,
						l_name:testUser.l_name,
						password:' 1Aa!2Bb@',
						email:testUser.email,
						city:testUser.city,
		  				user_state:testUser.user_state,
						zipcode:testUser.zipcode
					};
					return supertest(app)
					.post('/api/users')
					.send(userPasswordStartsSpaces)
					.expect(400,{error:`Password must not start or end with empty spaces`});
				});
				it(`responds 400 error when password ends with spaces`,()=>{
					const userPasswordEndsSpaces={
						username:testUser.username,
						f_name:testUser.f_name,
						l_name:testUser.l_name,
						password:'1Aa!2Bb@ ',
						email:testUser.email,
						city:testUser.city,
		  				user_state:testUser.user_state,
						zipcode:testUser.zipcode
					};
					return supertest(app)
					.post('/api/users')
					.send(userPasswordEndsSpaces)
					.expect(400,{error:`Password must not start or end with empty spaces`});
				});
				it(`responds 400 error when password isn't complex enough`,()=>{
					const userPasswordNotComplex={
						username:testUser.username,
						f_name:testUser.f_name,
						l_name:testUser.l_name,
						password:'11AAaabb',
						email:testUser.email,
						city:testUser.city,
		  				user_state:testUser.user_state,
						zipcode:testUser.zipcode
					};
					return supertest(app)
					.post('/api/users')
					.send(userPasswordNotComplex)
					.expect(400,{error:`Password must contain 1 upper case, lower case, number and special character`});
				});
				// Write a test for numeric zipcode check

				// Not sure how to implement both of these:
				it(`responds 400 'Email already taken' when email isn't unique`,()=>{
					const duplicateUser={
						username:testUser.username,
						f_name:testUser.f_name,
						l_name:testUser.l_name,
						password:'11AAaa!!',
						email:testUser.email,
						city:testUser.city,
		  				user_state:testUser.user_state,
						zipcode:testUser.zipcode
					};
					return supertest(app)
					.post('/api/users')
					.send(duplicateUser)
					.expect(400,{error:`Email already taken`});
				});
				// it(`responds 400 'Username already taken' when username isn't unique`,()=>{
				// 	const duplicateUser={
				// 		username:testUser.username,
				// 		f_name:testUser.f_name,
				// 		l_name:testUser.l_name,
				// 		password:'11AAaa!!',
				// 		email:testUser.email,
				// 		city:testUser.city,
		  		// 		user_state:testUser.user_state,
				// 		zipcode:testUser.zipcode
				// 	};
				// 	return supertest(app)
				// 	.post('/api/users')
				// 	.send(duplicateUser)
				// 	.expect(400,{error:`Username already taken`});
				// });
			});
			context(`Happy path`,()=>{
				it(`responds 201, serialized user, storing bcryped password`,()=>{
					const newUser={
						username:'username3',
						f_name:'f_name',
						l_name:'l_name',
					  	password:'11AAaa!!',
					  	email:'test23@test.com',
						city:'city',
		  				user_state:'state',
						zipcode:'99999'
					};
					return supertest(app)
					.post('/api/users')
					.send(newUser)
					.expect(201)
					.expect(res=>{
						expect(res.body).to.have.property('id');
					    expect(res.body.username).to.eql(newUser.username);
					    expect(res.body.f_name).to.eql(newUser.f_name);
					    expect(res.body.l_name).to.eql(newUser.l_name);
					    expect(res.body.password).to.eql(newUser.password);
						//{authToken:AuthService.createJwt(newUser.email,{res.body.id:user.id})}
					    //expect(res.body).to.not.have.property('password');
					    expect(res.body.email).to.eql(newUser.email);
					    expect(res.body.city).to.eql(newUser.city);
					    expect(res.body.user_state).to.eql(newUser.user_state);
					    expect(res.body.zipcode).to.eql(newUser.zipcode);
					    expect(res.headers.location).to.eql(`/api/users/${res.body.id}`);
					    const expectedDate=new Date().toLocaleString('en',{timeZone:'UTC'});
					    const actualDate=new Date(res.body.date_registered).toLocaleString('en',{timeZone:'UTC'});
					    expect(actualDate).to.eql(expectedDate);
					})
					.expect(res=>
						db
						.from('users')
						.select('*')
						.where({id:res.body.id})
						.first()
						.then(row=>{
							expect(row.username).to.eql(newUser.username);
							expect(row.f_name).to.eql(newUser.f_name);
					    	expect(row.l_name).to.eql(newUser.l_name);
					    	expect(res.body.email).to.eql(newUser.email);
					    	expect(row.city).to.eql(newUser.city);
					    	expect(row.user_state).to.eql(newUser.user_state);
					    	expect(row.zipcode).to.eql(newUser.zipcode);
							const expectedDate=new Date().toLocaleString('en',{timeZone:'UTC'});
							const actualDate=new Date(row.date_registered).toLocaleString('en',{timeZone:'UTC'});
							expect(actualDate).to.eql(expectedDate);
							return bcrypt.compare(newUser.password,row.password);
						})
						.then(compareMatch=>{expect(compareMatch).to.be.true;})
          			);
				});
			});
		});
	});
});