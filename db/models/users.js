const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasOne(models.User_Bios, {
        foreignKey: 'user_id',
      });
      Users.hasOne(models.Profile_Picture, {
        foreignKey: 'user_id',
      });
      Users.hasMany(models.Game_Rooms, {
        foreignKey: 'idPlayer1',
        as: 'player1',
      });
      Users.hasMany(models.Game_Rooms, {
        foreignKey: 'idPlayer2',
        as: 'player2',
      });
    }
  }
  Users.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
    },
  );
  return Users;
};
