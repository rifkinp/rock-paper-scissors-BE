const md5 = require("md5");
const db = require("../db/models");
const {Op, Sequelize} = require("sequelize");

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
            statusRoom: "Available",
        });
        return gameRoom;
    };

    //cari semua room
    getAllRoom = async () => {
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
        const roomList = await db.gameRooms.findAll({
            attributes: [
                "roomName",
                "updatedAt",
                "idPlayer1",
                "idPlayer2",
                "hasilPlayer1",
                "hasilPlayer2",
            ],
            where: {
                [Op.or]: [
                    {
                        idPlayer1: id,
                        hasilPlayer1: {[Op.ne]: null},
                    },
                    {
                        idPlayer2: id,
                        hasilPlayer2: {[Op.ne]: null},
                    },
                ],
            },
            raw: true,
        });

        return roomList
            .map(room => {
                if (room.idPlayer1 === id && room.hasilPlayer1) {
                    return {
                        idPlayer: room.idPlayer1,
                        hasilPlayer: room.hasilPlayer1,
                        roomName: room.roomName,
                        updatedAt: room.updatedAt,
                    };
                } else if (room.idPlayer2 === id && room.hasilPlayer2) {
                    return {
                        idPlayer: room.idPlayer2,
                        hasilPlayer: room.hasilPlayer2,
                        roomName: room.roomName,
                        updatedAt: room.updatedAt,
                    };
                }
            })
            .filter(Boolean);
    };
}

module.exports = new gameModel();
