const express = require("express");
const gameRoute = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const gameValidation = require("../Utils/game.validation");
const jsonSchemaMiddleware = require("../middleware/jsonSchemaMiddleware");
const authProtection = require("../middleware/authProtection");
const gameController = require("./game.controller");

// NEW API HERE
// 1. API Create Room
gameRoute.post(
    "/room",
    authMiddleware,
    gameValidation.recordGameRoom,
    jsonSchemaMiddleware.validationjsonSchema,
    gameController.recordGameRoom
);

// 2. GET all room *MASIH ERROR ??Ada dua cara, bisa ambil dari token dan masukkan langsung usernamenya
// atau bikin relationship ke gameroom dan usernamenya
gameRoute.get("/room", gameController.getAllRooms);

// 3. API get single room detail
gameRoute.get("/room/:idRoom", gameController.getSingleRoom);

// 4. API PUT single room
gameRoute.put("/room/:idRoom", authMiddleware, gameController.updateSingleGame);

// 5. API get single History per user
gameRoute.get("/history/", authMiddleware, gameController.getSingleHistory);

// 6. API Player VS Computer
gameRoute.post(
    "/room-vs-computer",
    authMiddleware,
    gameValidation.recordGameRoom,
    jsonSchemaMiddleware.validationjsonSchema,
    gameController.createRoomVsComputer
);

module.exports = gameRoute;
