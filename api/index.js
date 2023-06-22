// index.js
const express = require("express");
const app = express();
const port = 8000;
// const usersRoute = require("../users/user.route");
// const gameRoute = require("./game/game.route");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.get("/about", (req, res) => {
  res.send("This is my about route..... ");
});

// app.use("/users", usersRoute);

// const cors = require("cors");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./gameRpsSwagger.json");

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.get("/", (req, res) => {
//   return res.send("Hello World");
// });

// app.get("/pong", (req, res) => {
//   return res.json({message: "PINGGG POING"});
// });

// app.use("/games", gameRoute);

// app.listen(port, () => {
//   console.log("App is running on port " + port);
// });

app.listen(port, () => {
  console.log(`API listening on port ${port} `);
});

module.exports = app;
