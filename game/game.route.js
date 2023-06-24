const express = require("express");
const gameRoute = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const gameValidation = require("../Utils/game.validation");
const {validationjsonSchema} = require("../middleware/jsonSchemaMiddleware");
const gameController = require("./game.controller");

// NEW API HERE
// 1. API Create Room
gameRoute.post(
  "/room",
  authMiddleware,
  gameValidation.recordGameRoom,
  validationjsonSchema,
  gameController.recordGameRoom
);

// 2. GET all room HARUSNYA SUPER ADMIN NEH
gameRoute.get("/room", authMiddleware, gameController.getAllRooms);

// 3. API get single room detail HARUSNYA SUPER ADMIN NEH
gameRoute.get("/room/:idRoom", authMiddleware, gameController.getSingleRoom);

// 4. API PUT single room
gameRoute.put(
  "/room/:idRoom",
  authMiddleware,
  gameValidation.secondChoice,
  validationjsonSchema,
  gameController.updateSingleGame
);

// 5. API get single History per user
gameRoute.get("/history/", authMiddleware, gameController.getSingleHistory);

// 6. API Player VS Computer
gameRoute.post(
  "/room-vs-computer",
  authMiddleware,
  gameValidation.versusComputer,
  validationjsonSchema,
  gameController.createRoomVsComputer
);

module.exports = gameRoute;
