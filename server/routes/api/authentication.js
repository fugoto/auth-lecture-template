const { Router } = require('express');
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const { models } = require('../../db/index');
const { hash } = require('../../utils/index');

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
        },
        include: [Session],
      });

      const comparisonResult = await bcrypt.compare(password, foundUser.password);

      if (!comparisonResult) {
        throw new Error('Mismatched password!');
      }

      if (foundUser) {
        if (foundUser.session) {
          res.cookie('sid', foundUser.session.uuid, {
            maxAge: A_WEEK_IN_SECONDS,
            path: '/',
          });
          res.sendStatus(200);
        } else {
          const createdSession = await Session.create({});
          await createdSession.setUser(foundUser);

          res.cookie('sid', createdSession.uuid, {
            maxAge: A_WEEK_IN_SECONDS,
            path: '/',
          });
          res.sendStatus(201);
        }
      } else {
        res.sendStatus(404);
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

authRouter.get('/whoami', (req, res, next) => {
  if (req.user) {
    res.send({
      username: req.user.username,
      uuid: req.user.uuid,
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = authRouter;
