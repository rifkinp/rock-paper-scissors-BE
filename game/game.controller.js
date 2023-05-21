const gameModel = require("./game.model");
const {whoIsWin, getComputerChoice} = require("../Utils/rpsValidation");

class gameController {
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
            console.log(createRoom);
            return res.send({
                message:
                    "Success Record Room with ID : " + createRoom.dataValues.id,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Something Error"});
        }
    };

    //Get All Room Detail
    getAllRooms = async (req, res) => {
        try {
            const allRoom = await gameModel.getAllRoom();
            return res.json(allRoom);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Something Error"});
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
            return res.status(500).json({message: "Something Error"});
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

            //validation creator player 1
            if (singleRoom.idPlayer1 === idPlayer2) {
                return res.status(400).send("Creator can't fill second choice");
            }

            //validation room already completed
            if (singleRoom.statusRoom === "Completed") {
                return res.status(400).send("Room is completed");
            }

            //Input data player 2
            const updatePlayer2 = await gameModel.updatePlayer2Detail(
                choicePlayer2,
                idPlayer2,
                idRoom
            );

            //create variable for update the logic
            const x1 = singleRoom.choicePlayer1;
            const y1 = choicePlayer2;

            //input varriable to find the winner
            const [x1Result, y1Result] = whoIsWin(x1, y1);

            //Input result to database
            const recordHistory = await gameModel.updateHistoryRoom(
                x1Result,
                y1Result,
                idRoom
            );
            // console.log(recordHistory);

            return res.json({message: "Record History Success"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Something Error"});
        }
    };

    getSingleHistory = async (req, res) => {
        try {
            const id = req.user.id;

            // Do input validation *Testing
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({message: "Invalid user ID"});
            }

            // find singe room detail by ID
            const singleHistory = await gameModel.getRoomDetail(id);
            return res.json(singleHistory);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Something went wrong"});
        }
    };

    // Controller Player vs Computer
    createRoomVsComputer = async (req, res) => {
        const {choicePlayer1} = req.body;
        const player1 = req.user.id;

        try {
            const roomName = "VS COM";
            const choicePlayer2 = getComputerChoice();
            const [hasilPlayer1, hasilPlayer2] = whoIsWin(
                choicePlayer1,
                choicePlayer2
            );

            // console.log([hasilPlayer1, hasilPlayer2]);

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
