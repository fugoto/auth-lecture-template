const { Model, DataTypes } = require('sequelize');

class Session extends Model {}

Session.init({
  uuid: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

module.exports = Session;
