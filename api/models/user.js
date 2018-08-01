'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    userName: DataTypes.STRING,
    strategyId: DataTypes.STRING,
    strategyName: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isEnable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'users',
    instanceMethods: {
      validPassword(password) {
        return bcrypt.compare(password, this.password);
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};