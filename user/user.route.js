const express = require('express');

const userRouter = express.Router();
const UserController = require('./user.controller');
const authMiddleware = require('../authMiddleware/authMiddleware');
// const protectionMiddleware = require('../authMiddleware/protectionMiddleware')
const userController = require('./user.controller');
const registrationValidator = require('../utils/registrationValidator');
const validationMiddleware = require('../authMiddleware/validationMiddleware');

userRouter.get('/alluser', authMiddleware, UserController.getAllUser);

userRouter.post(
  '/register',
  registrationValidator.userRegisterValidation,
  validationMiddleware,
  UserController.registerNewUser,
);

userRouter.post(
  '/login',
  registrationValidator.userLoginValidation,
  validationMiddleware,
  UserController.loginUser,
);

userRouter.put('/uploadProfile', authMiddleware, userController.uploadProfile);

userRouter.put(
  '/updateBio',
  authMiddleware,
  registrationValidator.updateBioValidation,
  validationMiddleware,
  UserController.updateUserBio,
);

userRouter.get('/findUser', authMiddleware, UserController.findUser);

// eslint-disable-next-line max-len
// ------------------------------------------------- GAME -------------------------------------------------------------------

userRouter.post(
  '/createRoom',
  authMiddleware,
  registrationValidator.createRoom,
  validationMiddleware,
  userController.createRoom,
);

userRouter.put(
  '/joinRoom/:id',
  authMiddleware,
  registrationValidator.joinRoom,
  validationMiddleware,
  userController.joinRoom,
);

userRouter.get('/allRoom', authMiddleware, userController.getAllRoom);

userRouter.get('/singleRoom/:id', authMiddleware, userController.getSingleRoom);

userRouter.get('/pvphistory', authMiddleware, userController.singleUserHistory);

userRouter.post(
  '/vsCom',
  authMiddleware,
  registrationValidator.vsCom,
  validationMiddleware,
  userController.playerVsCom,
);

userRouter.get('/generate-pdf', authMiddleware, userController.generatePdf);

module.exports = userRouter;
