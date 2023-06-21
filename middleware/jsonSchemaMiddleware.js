const {validationResult} = require("express-validator");

validationjsonSchema = async (req, res, next) => {
    const result = await validationResult(req);
    if (result.isEmpty()) {
        next();
    } else return res.send({errors: result.array()});
};

module.exports = {
    validationjsonSchema,
};
