const {body} = require("express-validator");

const userRegistrationValidation = [
    body("email")
        .notEmpty()
        .withMessage("Please enter the password")
        .isEmail()
        .withMessage("Invalid email format")
        .isLength({min: 5, max: 50})
        .withMessage("Email Min 6 Max 15 characters")
        .matches(/^[a-zA-Z0-9@._]+$/)
        .withMessage("Email can only contain letters, numbers, @, ., and _"),
    body("password")
        .notEmpty()
        .withMessage("Please enter the password")
        .isLength({min: 8, max: 15})
        .withMessage("Password Min 6 Max 15 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\s]+$/)
        .withMessage(
            "Password can contain letters, numbers, and Special Character"
        ),
    body("username")
        .notEmpty()
        .withMessage("Please enter the username")
        .isString()
        .withMessage("Must be character")
        .isLength({min: 5, max: 50})
        .withMessage("Username/Email Min 6 Max 15 characters")
        .matches(/^[a-zA-Z0-9@._]+$/)
        .withMessage(
            "User / Email can only contain letters, numbers, @, ., and _"
        ),
];

const userLoginValidation = [
    body("userOrEmail")
        .notEmpty()
        .withMessage("Please enter the username")
        .isString()
        .withMessage("Must be character")
        .isLength({min: 5, max: 50})
        .withMessage("Username/Email Min 6 Max 15 characters")
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage("Room Name can only contain letters, numbers, and spaces"),

    // body("userOrEmail")
    //     .notEmpty()
    //     .withMessage("Please enter the username or email")
    //     .custom(value => {
    //         if (value.includes("@")) {
    //             if (!validator.isEmail(value)) {
    //                 throw new Error("Invalid email format");
    //             }
    //         } else {
    //             if (!validator.isAlphanumeric(value)) {
    //                 throw new Error(
    //                     "Username can only contain letters and numbers"
    //                 );
    //             }
    //         }
    //         return true;
    //     })
    //     .withMessage("Invalid username or email format"),
    body("password")
        .notEmpty()
        .withMessage("Please enter the password")
        .isLength({min: 8, max: 15})
        .withMessage("Password Min 6 Max 15 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\s]+$/)
        .withMessage(
            "Password can contain letters, numbers, and Special Character"
        ),
];

const updateBioValidation = [
    body("phoneNumber")
        .notEmpty()
        .withMessage("Please enter the phone number")
        .isMobilePhone()
        .withMessage("Please enter correct Number")
        .isLength({min: 10, max: 15})
        .withMessage("Phone number must be between 10 and 15 characters"),
    body("address")
        .notEmpty()
        .withMessage("Please enter the address")
        .isString()
        .withMessage("Must be character")
        .matches(/^[a-zA-Z0-9\s./]+$/)
        .withMessage(
            "Address can only contain letters, numbers, spaces, dots, and slashes"
        )
        .isLength({min: 5, max: 100})
        .withMessage("Address must be between 5 and 100 characters"),
    body("fullName")
        .notEmpty()
        .withMessage("Please enter the fullname")
        .isString()
        .withMessage("Must be character")
        .isLength({min: 3, max: 50})
        .withMessage("Fullname Min 3 Max 50 characters")
        .matches(/^[a-zA-Z]+$/)
        .withMessage("Fullname can only contain letters"),
];

module.exports = {
    userRegistrationValidation,
    userLoginValidation,
    updateBioValidation,
};
