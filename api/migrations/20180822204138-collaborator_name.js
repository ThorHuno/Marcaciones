'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [
      await queryInterface.addColumn('colaboradores', 'firstName', {
        type: Sequelize.STRING(50),
        allowNull: false
      }),
      await queryInterface.addColumn('colaboradores', 'secondName', {
        type: Sequelize.STRING(50)
      }),
      await queryInterface.addColumn('colaboradores', 'surName', {
        type: Sequelize.STRING(50),
        allowNull: false
      }),
      await queryInterface.addColumn('colaboradores', 'secondSurName', {
        type: Sequelize.STRING(50)
      }),
    ]
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return [
      await queryInterface.removeColumn('colaboradores', 'firstName'),
      await queryInterface.removeColumn('colaboradores', 'secondName'),
      await queryInterface.removeColumn('colaboradores', 'surName'),
      await queryInterface.removeColumn('colaboradores', 'secondSurName'),
    ]
  }
};