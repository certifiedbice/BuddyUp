const express=require('express');
const path=require('path');
const UsersService=require('./users-service');
const usersRouter=express.Router();
const jsonBodyParser=express.json();

usersRouter
    .post('/',jsonBodyParser,(req,res,next)=>{
		const {username,name,password,zipcode}=req.body;
    	for(const field of ['username','name','password','zipcode']){
	       	if(!req.body[field]){
	        	return res.status(400).json({error:`Missing '${field}' in request body`});
			   }
		}
		const passwordError=UsersService.validatePassword(password);
		if(passwordError){return res.status(400).json({error:passwordError});}
		
		UsersService.hasUserWithUserName(req.app.get('db'),username)
		.then(hasUserWithUsername=>{
			if(hasUserWithUsername){
				return res.status(400).json({error:`username already taken`});
			}
			return UsersService.hashPassword(password)
				.then(hashedPassword=>{
					const newUser={
						username,
						name,
						password:hashedPassword,
						zipcode,
						date_registered:'now()'
					};
					return UsersService.insertUser(req.app.get('db'),newUser)
					.then(user=>{
						res
						.status(201)
						.location(path.posix.join(req.originalUrl,`/${user.id}`))
						.json(UsersService.serializeUser(user));
					});
				});
			})
		.catch(next);
	});
module.exports=usersRouter;