'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GameHistory.belongsTo(models.User, { foreignKey: "user_id" })
    }
  }
  GameHistory.init({
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    game_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GameHistory',
  });
  return GameHistory;
};