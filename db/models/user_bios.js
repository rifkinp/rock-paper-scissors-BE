/* eslint-disable camelcase */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_Bios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Bios.belongsTo(models.Users, {
        foreignKey: 'user_id',
      });
    }
  }
  User_Bios.init(
    {
      fullname: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      profilePicture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User_Bios',
    },
  );
  return User_Bios;
};
