const { Router } = require('express');
const chalk = require('chalk');
const { models } = require('../../db/index');

const { User, Session } = models;

const authRouter = Router();

const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).send({
      message: 'Username and password must both be strings.',
    });
  } else {
    try {
      const foundUser = await User.findOne({
        where: {
          username,
          password,
        },
        include: [Session],
      });

      if (foundUser) {
        if (foundUser.session) {
          res.cookie('sid', foundUser.session.uuid, {
            maxAge: A_WEEK_IN_SECONDS,
            path: '/',
          });
          res.sendStatus(200);
        } else {
          const createdSession = await Session.create({
            user: foundUser,
          }, {
            include: [User],
          });

          res.cookie('sid', createdSession.uuid, {
            maxAge: A_WEEK_IN_SECONDS,
            path: '/',
          });
          res.sendStatus(201);
        }
      }
    } catch (e) {
      console.log(chalk.red('Error while logging user in.'));
      console.error(e);
      res.status(500).send({
        message: e.message,
      });
    }
  }
});
