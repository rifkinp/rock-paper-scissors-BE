const md5 = require("md5");
const db = require("../db/models");
const {Op} = require("sequelize");

class gameModel {
    // cek single user
    getSingleUser = async idUser => {
        return await db.User.findOne({where: {id: idUser}});
    };

    //update single user
    updateGameResult = async (resultGame, gameName, idUser) => {
        const userGame = await db.GameHistory.create({
            status: resultGame,
            user_id: idUser,
            game_name: gameName,
        });
        return userGame;
    };

    //Cek history single ID
    dataGameHistory = async idUser => {
        return await db.User.findOne({
            where: {id: idUser},
            include: [db.GameHistory],
        });
    };

    // cek nameRoom
    checkRoomName = async roomName => {
        return await db.gameRooms.findOne({where: {roomName: roomName}});
    };

    // Record Room Game Name
    createGameRoom = async (roomName, choicePlayer1, player1) => {
        console.log(player1);
        const gameRoom = await db.gameRooms.create({
            roomName: roomName,
            choicePlayer1: choicePlayer1,
            idPlayer1: player1,
        });
        return gameRoom;
    };

    //cari semua room
    getRoomDetail = async () => {
        const roomList = await db.gameRooms.findAll({
            include: [
                {
                    model: db.User,
                    as: "player1",
                },
                {
                    model: db.User,
                    as: "player2",
                },
            ],
        });
        return roomList;
    };

    // Get Single Room Detail
    singleRoomDetail = async idRoom => {
        const roomSingleList = await db.gameRooms.findOne({
            where: {id: idRoom},
            include: [
                {
                    model: db.User,
                    as: "player1",
                },
                {
                    model: db.User,
                    as: "player2",
                },
            ],
            raw: true,
        });
        return roomSingleList;
    };

    updatePlayer2Detail = async (choicePlayer2, idPlayer2, idRoom) => {
        const idRoomInt = parseInt(idRoom);
        const updatePlayer2 = await db.gameRooms.update(
            {
                choicePlayer2: choicePlayer2,
                idPlayer2: idPlayer2,
            },
            {where: {id: idRoomInt}}
        );
        return updatePlayer2;
    };

    // dapatkan info room
    getChoicePlayer1 = async idRoom => {
        const roomSingleList = await db.gameRooms.findOne({
            where: {id: idRoom},
            include: [
                {
                    model: db.User,
                    as: "player1",
                },
                {
                    model: db.User,
                    as: "player2",
                },
            ],
        });
        return roomSingleList;
    };

    updateHistoryRoom = async (x1Result, y1Result, idRoom) => {
        const idRoomInt = parseInt(idRoom);
        console.log(idRoomInt);
        const updatePlayer2 = await db.gameRooms.update(
            {
                hasilPlayer1: x1Result,
                hasilPlayer2: y1Result,
                statusRoom: "Completed",
            },
            {where: {id: idRoomInt}}
        );
        return updatePlayer2;
    };

    getRoomDetail = async id => {
        console.log(id);
        const roomList = await db.gameRooms.findAll({
            where: {
                [Op.or]: [
                    // {idPlayer1: id, statusRoom: "Completed"},
                    // {idPlayer2: id, statusRoom: "Completed"},
                    {idPlayer1: id},
                    {idPlayer2: id},
                ],
            },
            include: [
                {
                    model: db.User,
                    as: "player1",
                },
                {
                    model: db.User,
                    as: "player2",
                },
            ],
            // attributes: { exclude :}
        });
        return roomList;
    };
}

module.exports = new gameModel();
