const { db } = require('../connection');
const { Model, DataTypes } = require('sequelize');

class Session extends Model {}

Session.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
}, { sequelize: db, modelName: 'session' });

module.exports = Session;
