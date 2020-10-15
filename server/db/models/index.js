const User = require('./user');
const Session = require('./session');

User.hasOne(Session);
Session.belongsTo(User);

module.exports = {
  User,
  Session,
};
