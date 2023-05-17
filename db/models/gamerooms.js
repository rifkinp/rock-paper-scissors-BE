"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class gameRooms extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            gameRooms.belongsTo(models.User, {foreignKey: "idPlayer1"});
            gameRooms.belongsTo(models.User, {foreignKey: "idPlayer2"});
        }
    }
    gameRooms.init(
        {
            roomName: DataTypes.STRING,
            idPlayer1: DataTypes.INTEGER,
            choicePlayer1: DataTypes.STRING,
            hasilPlayer1: DataTypes.STRING,
            idPlayer2: DataTypes.INTEGER,
            choicePlayer2: DataTypes.STRING,
            hasilPlayer2: DataTypes.STRING,
            statusRoom: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "gameRooms",
        }
    );
    return gameRooms;
};
