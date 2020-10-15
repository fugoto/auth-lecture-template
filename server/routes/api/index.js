const { Router } = require('express');
const authRouter = require('./authentication');
const usersRouter = require('./users');

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;
