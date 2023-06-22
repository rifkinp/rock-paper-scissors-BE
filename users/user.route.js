const express = require("express");
const userRoute = express.Router();
const userController = require("./user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const userValidation = require("../Utils/user.validation");
const jsonSchemaMiddleware = require("../middleware/jsonSchemaMiddleware");
const authProtection = require("../middleware/authProtection");

//API Untuk get all User HARUSNYA SUPER ADMIN NEH
userRoute.get("/login", userController.dataUser);

// userRoute.get("/login", (req, res) => {
//   return res.json({message: "LOGINGG POING"});
// });

// //API untuk register
// userRoute.post(
//     "/register",
//     userValidation.userRegistrationValidation,
//     jsonSchemaMiddleware.validationjsonSchema,
//     userController.userRegister
// );

// //Api untuk Login
// userRoute.post(
//     "/login",
//     userValidation.userLoginValidation,
//     jsonSchemaMiddleware.validationjsonSchema,
//     userController.userLogin
// );

// //API untuk get single ID + Bio
// userRoute.get(
//     "/detail/:idUser",
//     authMiddleware,
//     authProtection.validationCheck,
//     userController.userDetail
// );

// //API untuk update update biodata
// userRoute.put(
//     "/detail/:idUser",
//     authMiddleware,
//     authProtection.validationCheck,
//     userValidation.updateBioValidation,
//     jsonSchemaMiddleware.validationjsonSchema,
//     userController.userUpdate
// );

module.exports = userRoute;
