const gameModel = require("./game.model");
const jwtApp = require("jsonwebtoken");
const {matchedData} = require("express-validator");
const rpsValidation = require("../Utils/rpsValidation");

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
        try {
            const allRoom = await gameModel.getAllRoom();
            console.log(allRoom);
            return res.json(allRoom);
        } catch (error) {
            console.log(error);
            return res.json({message: "ada error di controller"});
        }
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

        try {
            //Get Room Detail
            const singleRoom = await gameModel.singleRoomDetail(idRoom);

            if (singleRoom.idPlayer1 === idPlayer2) {
                return res.send("Terduplikat");
            }

            if (singleRoom.statusRoom === "Completed") {
                return res.send("Room sudah selesai");
            }

            //Input data player 2
            const updatePlayer2 = await gameModel.updatePlayer2Detail(
                choicePlayer2,
                idPlayer2,
                idRoom
            );

            //Bikin variabel untuk update ke Logic
            const x1 = singleRoom.choicePlayer1;
            const y1 = choicePlayer2;

            //masukkan variabel ke Function Logic cari pemenang
            const result = await rpsValidation.whoIsWin(x1, y1);
            console.log(result);

            //simpan result function ke variabel
            const x1Result = result[0];
            const y1Result = result[1];

            //Input hasil ke database
            const recordHistory = await gameModel.updateHistoryRoom(
                x1Result,
                y1Result,
                idRoom
            );
            // console.log(recordHistory);

            return res.json({message: "Record History Berhasil"});
        } catch (error) {
            console.log(error);
            return res.send("ada error");
        }
    };

    getSingleHistory = async (req, res) => {
        const id = req.user.id;
        const singleHistory = await gameModel.getRoomDetail(id);
        return res.json(singleHistory);
    };
}

module.exports = new gameController();
