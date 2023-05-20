const gameModel = require("./game.model");
const {whoIsWin, getComputerChoice} = require("../Utils/rpsValidation");

class gameController {
    //record game
    recordGame = async (req, res) => {
        const {idUser} = req.params;
        const {resultGame, gameName} = req.body;
        try {
            const user = await gameModel.getSingleUser(idUser);
            if (!user) {
                res.statusCode = 400;
                return res.json({message: "User not found"});
            }
            const userGame = await gameModel.updateGameResult(
                resultGame,
                gameName,
                idUser
            );
            return res.json(userGame);
        } catch (error) {
            console.log(error);
            return res.statusCode(500).json({message: "Something Error"});
        }
    };

    singleGameHistory = async (req, res) => {
        const {idUser} = req.params;
        try {
            const user = await gameModel.getSingleUser(idUser);

            if (!user) {
                res.statusCode = 400;
                return res.json({message: "User tidak ditemukan"});
            }

            const userGame = await gameModel.dataGameHistory(idUser);
            return res.json(userGame);
        } catch (error) {
            console.log(error);
            return res.statusCode(500).json({message: "Something Error"});
        }
    };

    //record new Game Room
    recordGameRoom = async (req, res) => {
        const {roomName, choicePlayer1} = req.body;
        const player1 = req.user.id;

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
            return res.send({message: "Success Record Room"});
        } catch (error) {
            console.log(error);
            return res.statusCode(500).json({message: "Something Error"});
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
            return res.statusCode(500).json({message: "Something Error"});
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
                return res.status(404).send("Room is not found");
            }
            return res.json(singleRoom);
        } catch (error) {
            return res.statusCode(500).json({message: "Something Error"});
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
                return res.status(400).send("Creator can't fill second choice");
            }

            if (singleRoom.statusRoom === "Completed") {
                return res.status(400).send("Room is completed");
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

            return res.json({message: "Record History Success"});
        } catch (error) {
            console.log(error);
            return res.statusCode(500).json({message: "Something Error"});
        }
    };

    getSingleHistory = async (req, res) => {
        try {
            const id = req.user.id;
            const singleHistory = await gameModel.getRoomDetail(id);
            return res.json(singleHistory);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Something Error"});
        }
    };

    // Controller Player vs Computer
    createRoomVsComputer = async (req, res) => {
        const {choicePlayer1} = req.body;
        const player1 = req.user.id;

        try {
            const roomName = "VS COM"; // Set room name as 'VS COM'
            const choicePlayer2 = getComputerChoice(); // Get computer's choice
            const [hasilPlayer1, hasilPlayer2] = whoIsWin(
                choicePlayer1,
                choicePlayer2
            ); // Calculate results

            console.log([hasilPlayer1, hasilPlayer2]);

            const createRoom = await gameModel.createGameRoomVsComputer(
                roomName,
                choicePlayer1,
                choicePlayer2,
                player1,
                hasilPlayer1,
                hasilPlayer2
            );

            return res.json({
                message: "Room created successfully",
                hasilPlayer1: hasilPlayer1,
                hasilPlayer2: hasilPlayer2,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Error creating room"});
        }
    };
}
module.exports = new gameController();
