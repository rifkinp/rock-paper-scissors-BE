const gameModel = require("./game.model");
const jwtApp = require("jsonwebtoken");
const {matchedData} = require("express-validator");

class gameController {
    //record game
    recordGame = async (req, res) => {
        const {idUser} = req.params;
        const {resultGame, gameName} = req.body;
        const user = await gameModel.getSingleUser(idUser);
        try {
            if (!user) {
                res.statusCode = 400;
                return res.json({message: "User tidak ditemukan"});
            }
            const userGame = await gameModel.updateGameResult(
                resultGame,
                gameName,
                idUser
            );
            return res.json(userGame);
        } catch (error) {
            console.log(error);
        }
    };

    singleGameHistory = async (req, res) => {
        const {idUser} = req.params;
        const user = await gameModel.getSingleUser(idUser);
        try {
            if (!user) {
                res.statusCode = 400;
                return res.json({message: "User tidak ditemukan"});
            }
            const userGame = await gameModel.dataGameHistory(idUser);
            return res.json(userGame);
        } catch (error) {
            console.log(error);
        }
    };

    //record new Game Room
    recordGameRoom = async (req, res) => {
        const {roomName, choicePlayer1} = req.body;
        const player1 = req.user.id;
        // console.log(player1);
        try {
            const roomNameCheck = await gameModel.checkRoomName(roomName);

            if (roomNameCheck) {
                res.statusCode = 400;
                return res.json({message: "Create other name room"});
            }

            const createRoom = await gameModel.createGameRoom(
                roomName,
                choicePlayer1,
                player1
            );
            // console.log(player1);
            return res.send({message: "berhasil"});
        } catch (error) {
            console.log(error);
            return res.json({message: "ada error"});
        }
    };

    //Get All Room Detail **STILL ERROR ???
    getAllRooms = async (req, res) => {
        const getRoom = await gameModel.getRoomDetail();
        console.log(getRoom);
        return res.json(getRoom);
    };

    //GET Single Room Detail
    getSingleRoom = async (req, res) => {
        const {idRoom} = req.params;
        const {roomName, choicePlayer1} = req.body;
        console.log(idRoom);
        try {
            const singleRoom = await gameModel.singleRoomDetail(idRoom);

            if (!singleRoom) {
                return res.send("Room tidak ditemukan");
            }
            return res.json(singleRoom);
        } catch (error) {
            return console.log(error);
        }
    };

    //Update Single Room by player 2
    updateSingleGame = async (req, res) => {
        const {idRoom} = req.params;
        const {choicePlayer2} = req.body;
        const idPlayer2 = req.user.id;
        console.log(idRoom);
        console.log(choicePlayer2);
        console.log(idPlayer2);
        try {
            const updatePlayer2 = await gameModel.updatePlayer2Detail(
                choicePlayer2,
                idPlayer2,
                idRoom
            );
            return res.json(updatePlayer2);
        } catch (error) {
            console.log(error);
            return res.send("ada error");
        }
    };
}

module.exports = new gameController();
