const { validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
  const result = await validationResult(req);
  if (result.isEmpty()) {
    next();
  } else return res.status(400).send({ errors: result.array() });

  return null;
};
