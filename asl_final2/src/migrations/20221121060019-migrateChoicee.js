'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Choices', 'name');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Choices');
  },
};
