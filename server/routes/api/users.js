const chalk = require('chalk');
const { Router } = require('express');
const { models } = require('../../db/index');
const { hash } = require('../../utils/index');

const { User } = models;

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await hash(password);

  if (typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).send({
      message: 'Must include both a username and a string.',
    });
  } else {
    try {
      const createdUser = await User.create({ username, password: hashedPassword });

      res.sendStatus(201);
    } catch (e) {
      console.log(chalk.red('Failed to create user.'));
      console.error(e);

      res.status(400).send({
        message: 'Username is already taken.',
      });
    }
  }
});

module.exports = usersRouter;
