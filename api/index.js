// index.js
const express = require("express");
const userRoutesss = require("../users/user.routesss");
const app = express();
const port = 8000;
// const cors = require("cors");
// const usersRoute = require("../users/user.route");
// const gameRoute = require("./game/game.route");

require("dotenv").config();
// app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./gameRpsSwagger.json");

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/pong", (req, res) => {
  return res.json({message: "PINGGG POING"});
});

app.get("/userssss", userRoutesss);

// app.use("/games", gameRoute);
// app.use("/users", usersRoute);

app.listen(port, () => {
  console.log(`API listening on port ${port} `);
});

module.exports = app;
