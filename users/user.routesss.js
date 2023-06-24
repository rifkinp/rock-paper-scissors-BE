const express = require("express");
const userRoutesss = express.Router();

userRoutesss.get("/ping", (req, res) => {
  return res.json({message: "PINGGG POING"});
});

module.exports = userRoutesss;
