const { connectToDB, db } = require('./connection');
const { User, Session } = require('./models/index');

module.exports = {
  connectToDB,
  db,
  models: {
    User,
    Session,
  },
};
