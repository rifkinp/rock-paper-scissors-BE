/* eslint-disable camelcase */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game_Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game_Rooms.belongsTo(models.Users, {
        foreignKey: 'idPlayer1',
        as: 'player1',
      });
      Game_Rooms.belongsTo(models.Users, {
        foreignKey: 'idPlayer2',
        as: 'player2',
      });
    }
  }
  Game_Rooms.init(
    {
      roomName: DataTypes.STRING,
      idPlayer1: DataTypes.INTEGER,
      choicePlayer1: DataTypes.STRING,
      resultPlayer1: DataTypes.STRING,
      idPlayer2: DataTypes.INTEGER,
      choicePlayer2: DataTypes.STRING,
      resultPlayer2: DataTypes.STRING,
      statusRoom: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Game_Rooms',
    },
  );
  return Game_Rooms;
};
