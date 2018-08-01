'use strict';
var crypt = require('../utils/utils');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users', [
      {
        userName: 'atoruno',
        strategyId: '',
        strategyName: 'local',
        password: crypt.encrypt('Admin123%'),
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdmin: true,
        isEnable: true
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
