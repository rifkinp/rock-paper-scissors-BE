const express = require('express');
const userRoute = express.Router();
const userController = require('./user.controller');
const jwtApp = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const {checkSchema} = require('express-validator');

userRoute.get("/login", authMiddleware, 
userController.dataUser);

userRoute.post("/register", 
checkSchema({
    username: { isString: true },
    email: { isEmail: true },
    pasword: { isLength: { options: { min: 8 } } },
  }),
userController.userRegister);

userRoute.post("/login", userController.userLogin);

userRoute.get("/detail/:idUser", authMiddleware, userController.userDetail);

userRoute.put("/detail/:idUpdate", authMiddleware ,userController.userUpdate);

userRoute.put("/:idUser", authMiddleware, userController.recordGame);

userRoute.get('/detail/history/:idUser', authMiddleware, userController.singleGameHistory)
module.exports = userRoute;
