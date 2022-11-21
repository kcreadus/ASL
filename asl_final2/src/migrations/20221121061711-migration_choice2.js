'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Choices', 'questionID', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Questions',
        },
        key: 'id',
      },
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Choices');
  },
};
