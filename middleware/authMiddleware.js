const jwtApp = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  // ambil key authorization dalam header
  const {authorization} = req.headers;

  if (authorization === undefined) {
    res.statusCode = 400;
    return res.json({message: "Unauthorized"});
  }

  try {
    const splitedToken = authorization.split(" ")[1];
    // cek apakah token valid kalau tidak unathorized
    const token = await jwtApp.verify(splitedToken, process.env.SECRET_KEYS);
    req.user = token;
    console.log(req.user);
    next();
  } catch (error) {
    res.statusCode = 400;
    return res.json({message: "invalid token"});
  }
};

module.exports = authMiddleware;
