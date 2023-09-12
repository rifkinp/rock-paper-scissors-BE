/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */

const md5 = require('md5');
const { Op } = require('sequelize');
const db = require('../db/models');

class UserModel {
  async getAllUser() {
    const allUser = await db.Users.findAll({
      raw: true,
      include: [db.User_Bios],
      attributes: {
        exclude: ['password'],
      },
    });
    // console.log(allUser);
    return allUser;
  }

  async registerNewUser(userData) {
    const createUser = await db.Users.create({
      username: userData.username,
      email: userData.email,
      password: md5(userData.password),
    });
    return createUser;
  }

  async isUserExist(userData) {
    const existUser = await db.Users.findOne({
      where: {
        [Op.or]: [{ username: userData.username }, { email: userData.email }],
      },
    });
    return !!existUser;
  }

  async loginUser(username, password) {
    try {
      const dataUser = await db.Users.findOne({
        where: { username, password: md5(password) },
        attributes: { exclude: ['password'] },
        raw: true,
      });
      return dataUser;
    } catch (error) {
      // console.log(error);
      // throw new Error('Ada yang salah di model login');
    }
  }

  async uploadProfile(link, token) {
    const uploadProfile = await db.Profile_Picture.create({
      link,
      user_id: token,
    });
    return uploadProfile;
  }

  async updateProfile(link, token) {
    await db.Profile_Picture.update({ link }, { where: { user_id: token } });
  }

  async isProfileExist(token) {
    const profileExist = await db.Profile_Picture.findOne({
      where: { user_id: token },
    });
    return !!profileExist;
  }

  async registerUserBio(
    userId,
    fullname,
    address,
    phoneNumber,
    profilePicture,
  ) {
    const updateBio = await db.User_Bios.create({
      fullname,
      address,
      phoneNumber,
      user_id: userId,
      profilePicture,
    });
    return updateBio;
  }

  async updateUserBio(token, fullname, address, phoneNumber, profilePicture) {
    await db.User_Bios.update(
      {
        fullname,
        address,
        phoneNumber,
        profilePicture,
      },
      { where: { user_id: token } },
    );
  }

  async isUserBioExist(token) {
    const bioExist = await db.User_Bios.findOne({
      where: { user_id: token },
    });

    return !!bioExist;
  }

  async findUser(token) {
    return db.Users.findOne({
      include: [db.User_Bios, db.Profile_Picture],
      where: { id: token },
      attributes: { exclude: ['password'] },
    });
  }

  async createRoom(player1, token) {
    // console.log(player1);
    const createRoomPlayer = await db.Game_Rooms.create({
      roomName: player1.roomName,
      idPlayer1: token,
      choicePlayer1: player1.choicePlayer1,
      statusRoom: 'Available',
    });
    return createRoomPlayer;
  }

  joinRoom(player2, token, id) {
    const roomId = parseInt(id, 10);
    db.Game_Rooms.update(
      {
        choicePlayer2: player2.choicePlayer2,
        idPlayer2: token,
      },
      { where: { id: roomId } },
    );
  }

  async getSingleRoom(id) {
    const roomId = parseInt(id, 10);
    const singleRoom = await db.Game_Rooms.findOne({
      where: { id: roomId },
      include: [
        {
          model: db.Users,
          as: 'player1',
          attributes: ['id', 'username'],
        },
        {
          model: db.Users,
          as: 'player2',
          attributes: ['id', 'username'],
        },
      ],
      raw: true,
    });
    return singleRoom;
  }

  async RoomResult(result, id) {
    const roomId = parseInt(id, 10);
    await db.Game_Rooms.update(
      {
        resultPlayer1: result[0],
        resultPlayer2: result[1],
        statusRoom: 'Finish',
      },
      { where: { id: roomId } },
    );
  }

  async singleUserHistory(id) {
    try {
      const roomList = await db.Game_Rooms.findAll({
        attributes: [
          'id',
          'roomName',
          'updatedAt',
          'idPlayer1',
          'idPlayer2',
          'resultPlayer1',
          'resultPlayer2',
        ],
        where: {
          [Op.or]: [{ idPlayer1: id }, { idPlayer2: id }],
          [Op.and]: [
            { resultPlayer1: { [Op.ne]: null } },
            { resultPlayer2: { [Op.ne]: null } },
          ],
        },
        raw: true,
      });

      return roomList.map((room) => ({
        room_id: room.id,
        player_id: room.idPlayer1 === id ? room.idPlayer1 : room.idPlayer2,
        hasilPlayer:
          room.idPlayer1 === id ? room.resultPlayer1 : room.resultPlayer2,
        roomName: room.roomName,
        updatedAt: room.updatedAt,
      }));
    } catch (error) {
      // throw new Error(`Gagal menerima room detail : ${error.message}`);
    }
  }

  async getAllRoom() {
    const allRoom = await db.Game_Rooms.findAll({
      include: [
        {
          model: db.Users,
          as: 'player1',
        },
        {
          model: db.Users,
          as: 'player2',
        },
      ],
    });
    return allRoom;
  }

  async playerVsCom(
    roomName,
    id,
    choicePlayer1,
    resultPlayer1,
    choicePlayer2,
    resultPlayer2,
  ) {
    try {
      const playerVSCom = await db.Game_Rooms.create({
        roomName,
        idPlayer1: id,
        idPlayer2: 2,
        choicePlayer1,
        resultPlayer1,
        choicePlayer2,
        resultPlayer2,
        statusRoom: 'Finish',
      });
      return playerVSCom;
    } catch (error) {
      // console.log(error);
    }
  }
}

module.exports = new UserModel();
