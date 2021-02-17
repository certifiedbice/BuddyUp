const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('../config');
const knex = require('../../db/knex');

const AuthService={
	getUserWithUserName(db,username){
		return knex('users')
		.where({username})
		.first();
	},
	comparePasswords(password,hash){
		return bcrypt.compare(password,hash);
	},
	createJwt(subject,payload){
		return jwt.sign(
			payload,
			config.JWT_SECRET,
			{subject,expiresIn:config.JWT_EXPIRY,algorithm:'HS256'}
		);
	},
	verifyJwt(token){
		return jwt.verify(token,config.JWT_SECRET,{algorithms:['HS256']});
	},
	parseBasicToken(token){
		return Buffer
      	.from(token, 'base64')
      	.toString()
    	.split(':');
  	}
}
module.exports=AuthService;