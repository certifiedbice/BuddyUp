const express = require('express');
const path = require('path');
const UsersService = require('./users-service');
const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UsersService.getOne(id);

    if (!user)
      return next({
        status: 404,
        message: `Unable to find user with id ${id}`,
      });

    return res.status(200).json(user);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

usersRouter.post('/', jsonBodyParser, (req, res, next) => {
  const { username, name, password, zip_code } = req.body;
  for (const field of ['username', 'name', 'password', 'zip_code']) {
    if (!req.body[field]) {
      return res
        .status(400)
        .json({ error: `Missing '${field}' in request body` });
    }
  }
  const passwordError = UsersService.validatePassword(password);
  if (passwordError) {
    return res.status(400).json({ error: passwordError });
  }

  UsersService.hasUserWithUserName(req.app.get('db'), username)
    .then((hasUserWithUsername) => {
      if (hasUserWithUsername) {
        return res.status(400).json({ error: `username already taken` });
      }
      return UsersService.hashPassword(password).then((hashedPassword) => {
        const newUser = {
          username,
          name,
          password: hashedPassword,
          zip_code,
          date_registered: 'now()',
        };
        return UsersService.insertUser(req.app.get('db'), newUser).then(
          (user) => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${user.id}`))
              .json(UsersService.serializeUser(user));
          }
        );
      });
    })
    .catch(next);
});
module.exports = usersRouter;
