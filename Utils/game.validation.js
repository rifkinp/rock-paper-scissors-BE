const {body} = require("express-validator");

const recordGameRoom = [
    body("roomName")
        .notEmpty()
        .withMessage("Please enter the room Name")
        .isLength({min: 5, max: 50})
        .withMessage("Full Name Min 3 Max 50 characters")
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage("Room Name can only contain letters, numbers")
        .isString()
        .withMessage("Must be character"),
    body("choicePlayer1")
        .notEmpty()
        .withMessage("Please enter your choice")
        .custom(value => {
            const validChoices = ["rock", "scissors", "paper"];
            if (!validChoices.includes(value)) {
                throw new Error(
                    "Invalid choice. Valid choices are rock, scissors, and paper."
                );
            }
            return true;
        }),
];

const secondChoice = [
    body("choicePlayer2")
        .notEmpty()
        .withMessage("Please enter your choice")
        .custom(value => {
            const validChoices = ["rock", "scissors", "paper"];
            if (!validChoices.includes(value)) {
                throw new Error(
                    "Invalid choice. Valid choices are rock, scissors, and paper."
                );
            }
            return true;
        }),
];

const versusComputer = [
    body("choicePlayer1")
        .notEmpty()
        .withMessage("Please enter your choice")
        .custom(value => {
            const validChoices = ["rock", "scissors", "paper"];
            if (!validChoices.includes(value)) {
                throw new Error(
                    "Invalid choice. Valid choices are rock, scissors, and paper."
                );
            }
            return true;
        }),
];

module.exports = {
    recordGameRoom,
    secondChoice,
    versusComputer,
};
