const chalk = require('chalk');
const volleyball = require('volleyball');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { auth } = require('./middleware/index');
const { apiRouter } = require('./routes/index');

dotenv.config();

const server = require('./server');
const { connectToDB } = require('./db/index');

const PORT = process.env.PORT || 3000;
const DIST_PATH = path.join(__dirname, '../dist');
const IS_DEV = process.env.NODE_ENV === 'development';

server.use(volleyball);
server.use(express.json());
server.use(cookieParser());
server.use(auth);
server.use(express.static(DIST_PATH));
server.use('/api', apiRouter);

const startServer = () => new Promise((res) => {
  console.log(chalk.blue('Initializing server...'));
  server.listen(PORT, () => {
    console.log(chalk.green('Server is now listening on PORT:'), chalk.cyan(PORT));
    res();
  });
});

const startApplication = async () => {
  const start = Date.now();
  console.log(chalk.blue('Starting application...'));

  try {
    await connectToDB(IS_DEV);
    await startServer();

    const end = Date.now();
    console.log(chalk.greenBright(`Application started successfully. Elapsed time: ${(end - start) / 1000} seconds`));
  } catch (e) {
    console.log(chalk.red('Application failed to start.'));
    console.error(e);
  }
}

startApplication();
