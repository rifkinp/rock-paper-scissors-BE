const express = require("express");
const app = express();
const port = 8000;
const usersRoute = require("./users/user.route");
const gameRoute = require("./game/game.route");
// const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./gameRpsSwagger.json");
require("dotenv").config();

// app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  return res.json({message: "welcome to the jungle"});
});

app.get("/pong", (req, res) => {
  return res.json({message: "PINGGG POING"});
});

app.use("/games", gameRoute);

app.use("/users", usersRoute);

app.listen(port, () => {
  console.log("App is running on port " + port);
});
