const {matchedData, validationResult} = require("express-validator");

validationUserRegis = async (req, res, next) => {
    const result = await validationResult(req);
    if (result.isEmpty()) {
        const data = matchedData(req);
        // console.log(data);
        next();
    }

    res.send({errors: result.array()});
};

module.exports = {validationUserRegis};
