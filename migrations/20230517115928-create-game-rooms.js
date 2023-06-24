"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("gameRooms", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            roomName: {
                type: Sequelize.STRING,
            },
            idPlayer1: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            choicePlayer1: {
                type: Sequelize.STRING,
            },
            hasilPlayer1: {
                type: Sequelize.STRING,
            },
            idPlayer2: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            choicePlayer2: {
                type: Sequelize.STRING,
            },
            hasilPlayer2: {
                type: Sequelize.STRING,
            },
            statusRoom: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("gameRooms");
    },
};
