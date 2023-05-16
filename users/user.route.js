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
    jsonSchemaMiddleware.validationUserRegis,
    userController.userRegister
),
    userRoute.post(
        "/login",
        userValidation.userLoginValidation,
        jsonSchemaMiddleware.validationUserLogin,
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
    userController.userUpdate
);

userRoute.put(
    "/history/:idUser",
    authMiddleware,
    authProtection.validationCheck,
    userController.recordGame
);

userRoute.get(
    "/detail/history/:idUser",
    authMiddleware,
    authProtection.validationCheck,
    userController.singleGameHistory
);
module.exports = userRoute;
