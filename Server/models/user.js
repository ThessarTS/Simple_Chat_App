'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Username has already registered' },
      validate: {
        notNull: { msg: 'Username required' },
        notEmpty: { msg: 'Username required' },
        len: { args: [5, 20], msg: 'Username must between 5-20 characters' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password required' },
        notEmpty: { msg: 'Password required' },
        len: { args: [5, 20], msg: 'Password must between 5-20 characters' }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};