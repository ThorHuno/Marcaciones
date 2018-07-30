'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    userName: DataTypes.STRING,
    strategyId: DataTypes.STRING,
    strategyName: DataTypes.STRING
  }, {
    tableName: 'users'
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};