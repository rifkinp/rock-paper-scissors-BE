const express = require('express');
const userRoute = express.Router();
const userController = require('./user.controller')

userRoute.get("/login", userController.dataUser);

userRoute.post("/register", userController.userRegister);

userRoute.post("/login", userController.userLogin);

userRoute.get("/detail/:idUser", userController.userDetail);

userRoute.put("/detail/:idUpdate", userController.userUpdate);

userRoute.put("/:idUser", userController.recordGame);

userRoute.get('/detail/history/:idUser', userController.singleGameHistory)
module.exports = userRoute;
