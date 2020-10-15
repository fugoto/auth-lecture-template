const { Router } = require('express');
const { models } = require('../../db/index');

const { User } = models;

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).send({
      message: 'Must include both a username and a string.',
    });
  } else {
    try {
      const createdUser = await User.create({ username, password });

      res.sendStatus(201);
    } catch (e) {
      res.status(400).send({
        message: 'Username is already taken.',
      });
    }
  }
});

module.exports = usersRouter;
