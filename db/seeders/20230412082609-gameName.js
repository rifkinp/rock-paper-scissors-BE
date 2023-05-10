'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('GameNames',[{
      gameName: 'PaperRockScissors',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      gameName: 'MobileLegends',
      createdAt: new Date(),
      updatedAt: new Date(),
    }],
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GameNames', [{
      gameName: 'PaperRockScissors',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      gameName: 'MobileLegends',
      createdAt: new Date(),
      updatedAt: new Date(),
    },]);
  }
};
