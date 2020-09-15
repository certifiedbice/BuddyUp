const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

function makeUsersArray(){
	return [
		{
			id:1,
			username:'user1', 
			f_name:'jake', 
			l_name:'todd', 
			password:'somePass1', 
			email:'jake.todd@email.com', 
			city:'Tulsa', 
			user_state:'OK', 
			zipcode:'74008',
			date_registered:'2020-08-07 15:21:25'
		},
	  	{	
			id:2,
			username:'user2',
			f_name:'sarah',
			l_name:'shelly',
			password:'somePass2',
			email:'sarah.shelly@email.com',
			city:'New Orleans',
			user_state:'LA',
			zipcode:'70032',
			date_registered:'2020-08-07 15:21:25'
		},
	  	{	
			id:3,
			username:'user3',
			f_name:'tim',
			l_name:'tebow',
			password:'somePass3',
			email:'ttebow@email.com',
			city:'Sacramento',
			user_state:'CA',
			zipcode:'94203',
			date_registered:'2020-08-07 15:21:25'
		},
	  	{	
			id:4,
			username:'user4',
			f_name:'crystal',
			l_name:'ball',
			password:'somePass4',
			email:'crystalsball@email.com',
			city:'Chicago',
			user_state:'IL',
			zipcode:'60290',
			date_registered:'2020-08-07 15:21:25'
		},
	  	{
			id:5,
			username:'user5',
			f_name:'jimmy',
			l_name:'schmidts',
			password:'somePass5',
			email:'takinaschmidts@email.com',
			city:'Denver',
			user_state:'CO',
			zipcode:'80203',
			date_registered:'2020-08-07 15:21:25'
		}
	];
}

function makeOrgsArray(){
	return [
		{
			org_name:'Waterside Apartments',
			org_phone:'9185997180',
			org_st_addr:'1703 S Jackson Ave West',
			org_city:'tulsa',
			org_state:'OK',
			org_zipcode:'74107',
			pos_endorsements:'15',
			neg_endorsements:'2',
			org_type:'housing'
		},
		{
			org_name:'The Giani Building', 
			org_phone:'5045990987', 
			org_st_addr:'600 Canal St', 
			org_city:'New Orleans', 
			org_state:'LA', 
			org_zipcode:'70130', 
			pos_endorsements:'3', 
			neg_endorsements:'13', 
			org_type:'housing'
		},
		{
			org_name:'Broadleaf Apartments', 
			org_phone:'9163915100', 
			org_st_addr:'40 Park City Ct', 
			org_city:'Sacramento', 
			org_state:'CA', 
			org_zipcode:'95831', 
			pos_endorsements:'14', 
			neg_endorsements:'56', 
			org_type:'housing'
		},
		{
			org_name:'Gateway West Loop', 
			org_phone:'3129670513', 
			org_st_addr:'11 S Green St', 
			org_city:'Chicago', 
			org_state:'IL', 
			org_zipcode:'60607', 
			pos_endorsements:'0', 
			neg_endorsements:'69', 
			org_type:'housing'
		},
		{
			org_name:'Brownstone Realty LTD', 
			org_phone:'3038328155', 
			org_st_addr:'789 Sherman St', 
			org_city:'Denver', 
			org_state:'CO', 
			org_zipcode:'80203', 
			pos_endorsements:'1', 
			neg_endorsements:'113', 
			org_type:'housing'
		}
	];
}

function makeCommentsArray(users,orgs){
	return [
		{
			id:1,
			title:'Total waste of time!',
			user_id:users[0].id,
			org_id:orgs[0].id,
			comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			date_published:new Date('2029-01-22T16:28:32.615Z')
		},
  		{
			id:2,
			title:'Great Place',
			user_id:users[1].id,
			org_id:orgs[1].id,
			comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			date_published:new Date('2029-01-22T16:28:32.615Z')
		},
  		{
			id:3,
			title:'Terrible!',
			user_id:users[2].id,
			org_id:orgs[2].id,
			comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			date_published:new Date('2029-01-22T16:28:32.615Z')
		},
  		{
			id:4,
			title:'Unbelievable!',
			user_id:users[3].id,
			org_id:orgs[3].id,
			comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			date_published:new Date('2029-01-22T16:28:32.615Z')
		},
  		{
			id:5,
			title:'Highly recommend',
			user_id:users[4].id,
			org_id:orgs[4].id,
			comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			date_published:new Date('2029-01-22T16:28:32.615Z')
		}
	];
}

function makeEndorsementsArray(users,orgs){
	return [
		{
			id:1,
			user_id:users[0].id,
			org_id:orgs[0].id,
			endorsement:0,
			date_published:new Date('2029-01-22T16:28:32.615Z')
		},
		{
			id:2,
			user_id:users[1].id,
			org_id:orgs[1].id,
			endorsement:1,
			date_published:new Date('2029-01-22T16:28:32.615Z')
		},
		{
			id:3,
			user_id:users[2].id,
			org_id:orgs[2].id,
			endorsement:0,
			date_published:new Date('2029-01-22T16:28:32.615Z')
		},
		{
			id:4,
			user_id:users[3].id,
			org_id:orgs[3].id,
			endorsement:0,
			date_published:new Date('2029-01-22T16:28:32.615Z')
		},
		{
			id:5,
			user_id:users[4].id,
			org_id:orgs[4].id,
			endorsement:1,
			date_published:new Date('2029-01-22T16:28:32.615Z')
		}
	];
}

function makeExpectedOrg(org){
	return{
		org_name:org.org_name,
		org_phone:org.org_phone,
		org_st_addr:org.org_st_addr,
		org_city:org.org_city,
		org_state:org.org_state,
		org_zipcode:org.org_zipcode,
		pos_endorsements:org.pos_endorsements,
		neg_endorsements:org.neg_endorsements,
		org_type:org.org_type
	}
}

function makeNewOrg(){
	return{
		org_name:'Test APT',
		org_phone:'0000000000',
		org_st_addr:'123 S Test Ave',
		org_city:'tulsa',
		org_state:'OK',
		org_zipcode:'74107',
		org_type:'housing'
	}
}

function makeNewEndorsement(){
	return{
		org_id:'1',
		endorsement:'true'
	}
}

function makeNewComment(){
	return{
		title:'test',
		org_id:'1',
		comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
	}
}

function makeMaliciousOrg(){
	const maliciousOrg={
		id:911,
		org_name:'Naughty naughty very naughty <script>alert("xss");</script>',
		org_phone:'9185997180',
		org_st_addr:`Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
		org_city:'tulsa',
		org_state:'OK',
		org_zipcode:'74107',
		pos_endorsements:15,
		pos_endorsements:2,
		org_type:'housing'	  
	}
	const expectedOrg={
		...maliciousOrg,
		org_name:'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
		org_st_addr:`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
	}
	return {
		maliciousOrg,
		expectedOrg,
	}
}

function makeMaliciousComment(){
	const maliciousComment={
	  	id:911,
	  	title:'Naughty naughty very naughty <script>alert("xss");</script>',
		user_id:'1',
		org_id:'1',
		comment:`Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
		date_published:new Date().toISOString()
	}
	const expectedComment={
		...maliciousComment,
		title:'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
		comment: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
	}
	return {
		maliciousComment,
		expectedComment,
	}
}

function makeMaliciousEndorsement(){
	const maliciousEndorsement={
	  	id:911,
		user_id:'1',
		org_id:'1',
		endorsement:`Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
		date_published:new Date().toISOString()
	}
	const expectedEndorsement={
		...maliciousEndorsement,
		endorsement: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
	}
	return {
		maliciousEndorsement,
		expectedEndorsement,
	}
}

function makeOrgsFixtures(){
	const testUsers=makeUsersArray();
	const testOrgs=makeOrgsArray();
	const testComments=makeCommentsArray(testUsers,testOrgs);
	return {testUsers,testOrgs,testComments};
}

function makeEndorsementsFixtures(){
	const testUsers=makeUsersArray();
	const testOrgs=makeOrgsArray();
	const testEndorsements=makeEndorsementsArray(testUsers,testOrgs);
	return {testUsers,testOrgs,testEndorsements};
}

function makeCommentsFixtures(){
	const testUsers=makeUsersArray();
	const testOrgs=makeOrgsArray();
	const testComments=makeCommentsArray(testUsers,testOrgs);
	return {testUsers,testOrgs,testComments};
}

function cleanTables(db){
    return db.transaction(trx=>
    	trx.raw(
        	`TRUNCATE
				users
			`
      	)
      	.then(()=>
        	Promise.all([
				trx.raw(`ALTER SEQUENCE organizations_id_seq minvalue 0 START WITH 1`),
				trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
				// trx.raw(`ALTER SEQUENCE comments_id_seq minvalue 0 START WITH 1`),
				// trx.raw(`ALTER SEQUENCE endorsements_id_seq minvalue 0 START WITH 1`),
        		// trx.raw(`SELECT setval('organizations_id_seq', 0)`),
        		trx.raw(`SELECT setval('users_id_seq', 0)`),
        		// trx.raw(`SELECT setval('comments_id_seq', 0)`),
        		// trx.raw(`SELECT setval('endorsements_id_seq', 0)`),
        	])
      	)
    )
}

function seedOrgsTables(db,orgs){
	// use a transaction to group the queries and auto rollback on any failure
	return db.transaction(async trx=>{
		await trx.into('organizations').insert(orgs);
		// Needs implementation, but won't work due to how I structured the org_id.

		// update the auto sequence to match the forced id values
		// await trx.raw(
		// 	`SELECT setval('organizations_id_seq', ?)`,
		// 	[orgs[orgs.length-1].id],
		// )
	});
}

function seedUsersTables(db,users){
	const preppedUsers=users.map(user=>({
		...user,
		password:bcrypt.hashSync(user.password,1)
	}));
	return db.into('users').insert(preppedUsers)
		.then(()=>
			// update the auto sequence to stay in sync
			db.raw(
				`SELECT setval('users_id_seq', ?)`,
				[users[users.length-1].id],
			)
		)
}

function seedCommentsTables(db,comments){
	// use a transaction to group the queries and auto rollback on any failure
	return db.transaction(async trx=>{
		await trx.into('comments').insert(comments);
		// update the auto sequence to match the forced id values
		await trx.raw(
			`SELECT setval('comments_id_seq', ?)`,
			[articles[comments.length-1].id],
		)
	});
}

function seedEndorsementsTables(db,endorsements){
	// use a transaction to group the queries and auto rollback on any failure
	return db.transaction(async trx=>{
		await trx.into('endorsements').insert(endorsements);
		// update the auto sequence to match the forced id values
		await trx.raw(
				`SELECT setval('endorsements_id_seq', ?)`,
				[endorsements[endorsements.length-1].id],
		)
	});
}

function seedMaliciousOrg(db,org){
	return db.into('organizations').insert([org]);
}

function makeAuthHeader(user,secret=process.env.JWT_SECRET){
	const token=jwt.sign({user_id:user.id},secret,{subject:user.email,algorithm:'HS256'});
	return `Bearer ${token}`;
}

module.exports={
	makeUsersArray,
	makeOrgsArray,
	makeCommentsArray,
	makeEndorsementsArray,
	makeExpectedOrg,
	makeNewOrg,
	makeNewEndorsement,
	makeNewComment,
	makeMaliciousOrg,
	makeMaliciousComment,
	makeMaliciousEndorsement,
	makeOrgsFixtures,
	makeEndorsementsFixtures,
	makeCommentsFixtures,
	cleanTables,
	seedUsersTables,
	seedOrgsTables,
	seedEndorsementsTables,
	seedCommentsTables,
	seedMaliciousOrg,
	makeAuthHeader
}