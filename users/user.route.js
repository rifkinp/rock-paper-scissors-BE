const express = require("express");
const userRoute = express.Router();
const userController = require("./user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const userValidation = require("../Utils/user.validation");
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

module.exports = userRoute;
