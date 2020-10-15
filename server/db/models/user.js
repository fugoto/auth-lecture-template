const { db } = require('../connection');
const { Model, DataTypes } = require('sequelize');

class User extends Model {}

User.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize: db, modelName: 'user' });

module.exports = User;
