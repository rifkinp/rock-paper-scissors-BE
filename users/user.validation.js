const {body} = require("express-validator");

const userRegistrationValidation = [
    body("email")
        .notEmpty()
        .withMessage("Please enter the password")
        .isEmail()
        .withMessage("Must be correct email"),
    body("password")
        .notEmpty()
        .withMessage("Please enter the password")
        .isLength({min: 8, max: 15})
        .withMessage("Password Min 6 Max 15 characters"),
    body("username")
        .notEmpty()
        .withMessage("Please enter the username")
        .isString()
        .withMessage("Must be character"),
];

const userLoginValidation = [
    body("userOrEmail")
        .notEmpty()
        .withMessage("Please enter the username")
        .isString()
        .withMessage("Must be character"),
    body("password")
        .notEmpty()
        .withMessage("Please enter the password")
        .isLength({min: 8, max: 15})
        .withMessage("Password Min 6 Max 15 characters"),
];

module.exports = {userRegistrationValidation, userLoginValidation};
