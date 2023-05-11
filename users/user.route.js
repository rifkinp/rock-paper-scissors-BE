const express = require('express');
const userRoute = express.Router();
const userController = require('./user.controller')
const jwtApp = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

userRoute.get("/login", authMiddleware, userController.dataUser);

userRoute.post("/register", userController.userRegister);

userRoute.post("/login", userController.userLogin);

userRoute.get("/detail/:idUser", authMiddleware, userController.userDetail);

userRoute.put("/detail/:idUpdate", authMiddleware ,userController.userUpdate);

userRoute.put("/:idUser", authMiddleware, userController.recordGame);

userRoute.get('/detail/history/:idUser', authMiddleware, userController.singleGameHistory)
module.exports = userRoute;
