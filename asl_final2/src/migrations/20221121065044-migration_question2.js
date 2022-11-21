'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Questions', 'weight');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  },
};
