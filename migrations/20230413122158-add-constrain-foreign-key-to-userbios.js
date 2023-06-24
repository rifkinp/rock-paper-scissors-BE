'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("UserBios",{
      type: "foreign key",
      fields: ["user_id"],
      references: {
        table: "Users",
        field: "id",
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("UserBios",{
      type: "foreign key",
      fields: ["user_id"],
      references: {
        table: "Users",
        field: "id",
      }
    })
  }
};
