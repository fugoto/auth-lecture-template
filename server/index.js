const chalk = require('chalk');
const volleyball = require('volleyball');
const cookieParser = require('cookie-parser');
const { json } = require('express');
const server = require('./server');

const PORT = process.env.PORT || 3000;

server.use(volleyball);
server.use(json());
server.use(cookieParser());

const startServer = () => new Promise((res) => {
  server.listen(PORT, () => {
    console.log(chalk.green('Server is now listening on PORT:'), chalk.cyan(PORT));
    res();
  });
});

startServer();
