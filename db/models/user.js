"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasOne(models.UserBio, {foreignKey: "user_id"});
            User.hasMany(models.gameRooms, {
                foreignKey: "idPlayer1",
                as: "player1",
            });
            User.hasMany(models.gameRooms, {
                foreignKey: "idPlayer2",
                as: "player2",
            });
            User.hasMany(models.GameHistory, {foreignKey: "user_id"});
        }
    }
    User.init(
        {
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            isActive: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
