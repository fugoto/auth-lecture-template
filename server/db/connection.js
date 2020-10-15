const { Sequelize } = require('sequelize');
const chalk = require('chalk');

const DB_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/auth-lecture-template';

const db = new Sequelize(DB_URL, { logging: false });

const connectToDB = (force = false) => {
  return db.sync({ force })
    .then(() => db)
    .catch((err) => {
      console.log(chalk.red(`Error connecting to DB.`));
      throw err;
    });
}

module.exports = { db, connectToDB };
