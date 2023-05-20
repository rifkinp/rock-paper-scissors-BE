const md5 = require("md5");
const db = require("../db/models");
const {Op, Sequelize} = require("sequelize");
class gameModel {
    // cek nameRoom
    checkRoomName = async roomName => {
        try {
            return await db.gameRooms.findOne({where: {roomName: roomName}});
        } catch (error) {
            throw new Error("Failed to check Room Name : " + error.message);
        }
    };

    // Record Room Game Name
    createGameRoom = async (roomName, choicePlayer1, player1) => {
        try {
            const gameRoom = await db.gameRooms.create({
                roomName: roomName,
                choicePlayer1: choicePlayer1,
                idPlayer1: player1,
                statusRoom: "Available",
            });
            return gameRoom;
        } catch (error) {
            throw new Error("Failed to create new Room : " + error.message);
        }
    };

    //cari semua room
    getAllRoom = async () => {
        try {
            const roomList = await db.gameRooms.findAll({
                include: [
                    {
                        model: db.User,
                        as: "player1",
                        attributes: ["id", "username"],
                    },
                    {
                        model: db.User,
                        as: "player2",
                        attributes: ["id", "username"],
                    },
                ],
            });
            return roomList;
        } catch (error) {
            throw new Error("Failed to get all Room Data : " + error.message);
        }
    };

    // Get Single Room Detail
    singleRoomDetail = async idRoom => {
        try {
            const roomSingleList = await db.gameRooms.findOne({
                where: {id: idRoom},
                include: [
                    {
                        model: db.User,
                        as: "player1",
                        attributes: ["id", "username"],
                    },
                    {
                        model: db.User,
                        as: "player2",
                        attributes: ["id", "username"],
                    },
                ],

                raw: true,
            });
            return roomSingleList;
        } catch (error) {
            throw new Error("Failed to get room detail : " + error.message);
        }
    };

    updatePlayer2Detail = async (choicePlayer2, idPlayer2, idRoom) => {
        try {
            const idRoomInt = parseInt(idRoom);
            const updatePlayer2 = await db.gameRooms.update(
                {
                    choicePlayer2: choicePlayer2,
                    idPlayer2: idPlayer2,
                },
                {where: {id: idRoomInt}}
            );
            return updatePlayer2;
        } catch (error) {
            throw new Error(
                "Failed to input player2 detail : " + error.message
            );
        }
    };

    // dapatkan info room
    getChoicePlayer1 = async idRoom => {
        try {
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
        } catch (error) {
            throw new Error(
                "Failed to retrieve room information : " + error.message
            );
        }
    };

    updateHistoryRoom = async (x1Result, y1Result, idRoom) => {
        const idRoomInt = parseInt(idRoom);
        console.log(idRoomInt);
        try {
            const updatePlayer2 = await db.gameRooms.update(
                {
                    hasilPlayer1: x1Result,
                    hasilPlayer2: y1Result,
                    statusRoom: "Completed",
                },
                {where: {id: idRoomInt}}
            );
            return updatePlayer2;
        } catch (error) {
            throw new Error(
                "Failed to update game room history : " + error.message
            );
        }
    };

    getRoomDetail = async id => {
        try {
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
                    [Op.or]: [{idPlayer1: id}, {idPlayer2: id}],
                    // [Op.and]: [{statusRoom: "Completed"}],
                },
                raw: true,
            });
            console.log(roomList.map());

            return roomList.map(room => ({
                idPlayer:
                    room.idPlayer1 === id ? room.idPlayer1 : room.idPlayer2,
                hasilPlayer:
                    room.idPlayer1 === id
                        ? room.hasilPlayer1
                        : room.hasilPlayer2,
                roomName: room.roomName,
                updatedAt: room.updatedAt,
            }));
        } catch (error) {
            throw new Error(
                "Failed to retrieve room details : " + error.message
            );
        }
    };

    // PLayer vs Computer
    // Function to get random choice for computer

    // Create Room vs Computer
    getRoomDetail = async id => {
        try {
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
                    [Op.or]: [{idPlayer1: id}, {idPlayer2: id}],
                    [Op.and]: [{statusRoom: "Completed"}],
                },
                raw: true,
            });
            console.log(roomList);

            // Gunakan argumen pada map() untuk mengubah bentuk objek
            return roomList.map(room => ({
                idPlayer:
                    room.idPlayer1 === id ? room.idPlayer1 : room.idPlayer2,
                hasilPlayer:
                    room.idPlayer1 === id
                        ? room.hasilPlayer1
                        : room.hasilPlayer2,
                roomName: room.roomName,
                updatedAt: room.updatedAt,
            }));
        } catch (error) {
            throw new Error(
                "Failed to retrieve room details: " + error.message
            );
        }
    };
}

module.exports = new gameModel();
