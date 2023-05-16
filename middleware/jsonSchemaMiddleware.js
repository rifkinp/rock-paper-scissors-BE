const {validationResult} = require("express-validator");

validationUserRegis = async (req, res, next) => {
    const result = await validationResult(req);
    if (result.isEmpty()) {
        next();
    } else return res.send({errors: result.array()});
};

validationUserLogin = async (req, res, next) => {
    const result = await validationResult(req);
    if (result.isEmpty()) {
        next();
    } else return res.send({errors: result.array()});
};

// validationUserRegis = async (req, res, next) => {
//     const errors = await validationResult(req);
//     if (!errors.isEmpty())
//         return res.status(400).json({errors: errors.array()});
//     next();
// };

module.exports = {validationUserRegis, validationUserLogin};
