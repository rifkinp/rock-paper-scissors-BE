const {body} = require("express-validator");

const recordGameHistory = [
    body("resultGame").notEmpty().withMessage("Please enter the history"),
    body("gameName").isString().withMessage("Must be character"),
];

const recordGameRoom = [
    body("roomName").notEmpty().withMessage("Please enter the room Name"),
    body("choicePlayer1").notEmpty().withMessage("Please enter your choice"),
];

module.exports = {
    recordGameHistory,
    recordGameRoom,
};
