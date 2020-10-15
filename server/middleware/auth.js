const chalk = require('chalk');
const { models } = require('../db/index');

const { Session, User } = models;

const authMiddleware = async (req, res, next) => {
  const { sid } = req.cookies;

  if (!sid) {
    console.log('No session associated with this user.');
    req.user = null;
  } else {
    const session = await Session.findByPk(sid, {
      include: User,
    });

    if (!session) {
      console.log(chalk.red('Invalid session ID - not located in database. Removing cookie.'));
      res.clearCookie('sid');
      req.user = null;
    } else {
      // You could update the expiry of the cookie here if desired.
      console.log(chalk.magenta(`Session User Identified: ${session.user.username}`));
      req.user = session.user;
    }
  }

  next();
}

module.exports = authMiddleware;
