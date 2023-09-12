const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined) {
    res.statusCode = 401;
    return res.json({ message: 'Unauthorized' });
  }

  try {
    const splitedToken = authorization.split(' ')[1];

    const token = await jwt.verify(splitedToken, process.env.SECRET_KEY);
    req.token = token;

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    res.statusCode = 401;
    return res.json({ message: 'Invalid Token' });
  }

  return null;
};
