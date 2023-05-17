const express = require("express");
const userRoute = express.Router();
const userController = require("./user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const userValidation = require("./user.validation");
const jsonSchemaMiddleware = require("../middleware/jsonSchemaMiddleware");
const authProtection = require("../middleware/authProtection");

userRoute.get("/login", authMiddleware, userController.dataUser);

userRoute.post(
    "/register",
    userValidation.userRegistrationValidation,
    jsonSchemaMiddleware.validationjsonSchema,
    userController.userRegister
),
    userRoute.post(
        "/login",
        userValidation.userLoginValidation,
        jsonSchemaMiddleware.validationjsonSchema,
        userController.userLogin
    );

userRoute.get(
    "/detail/:idUser",
    authMiddleware,
    authProtection.validationCheck,
    userController.userDetail
);

userRoute.put(
    "/detail/:idUser",
    authMiddleware,
    authProtection.validationCheck,
    userValidation.updateBioValidation,
    jsonSchemaMiddleware.validationjsonSchema,
    userController.userUpdate
);

userRoute.put(
    "/history/:idUser",
    authMiddleware,
    authProtection.validationCheck,
    userValidation.recordGameHistory,
    jsonSchemaMiddleware.validationjsonSchema,
    userController.recordGame
);

userRoute.get(
    "/detail/history/:idUser",
    authMiddleware,
    authProtection.validationCheck,
    userController.singleGameHistory
);

// NEW API HERE
// 1. API Create Room
userRoute.post(
    "/room",
    authMiddleware,
    userValidation.recordGameRoom,
    jsonSchemaMiddleware.validationjsonSchema,
    userController.recordGameRoom
);

// 2. GET all room *MASIH ERROR ??Ada dua cara, bisa ambil dari token dan masukkan langsung usernamenya
// atau bikin relationship ke gameroom dan usernamenya
userRoute.get("/room", userController.getAllRooms);

// 3. API get single room detail
userRoute.get("/room/:idRoom", userController.getSingleRoom);
module.exports = userRoute;

// 4. API PUT single room
userRoute.put("/room/:idRoom", (req, res) => {
    res.send("gas lah berhasil");
});
// 5. API get single History per user

//
