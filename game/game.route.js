const express = require("express");
const gameRoute = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userValidation = require("../Utils/user.validation");
const jsonSchemaMiddleware = require("../middleware/jsonSchemaMiddleware");
const authProtection = require("../middleware/authProtection");
const gameController = require("./game.controller");

gameRoute.put(
    "/history/:idUser",
    authMiddleware,
    authProtection.validationCheck,
    userValidation.recordGameHistory,
    jsonSchemaMiddleware.validationjsonSchema,
    gameController.recordGame
);

gameRoute.get(
    "/detail/history/:idUser",
    authMiddleware,
    authProtection.validationCheck,
    gameController.singleGameHistory
);

// NEW API HERE
// 1. API Create Room
gameRoute.post(
    "/room",
    authMiddleware,
    userValidation.recordGameRoom,
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
//

module.exports = gameRoute;
