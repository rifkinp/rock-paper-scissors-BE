// // index.js
// const express = require("express");

// const app = express();
// const PORT = 4000;

// app.listen(PORT, () => {
//   console.log(`API listening on PORT ${PORT} `);
// });

// app.get("/", (req, res) => {
//   res.send("Hey this is my API running 🥳");
// });

// app.get("/about", (req, res) => {
//   res.send("This is my about route..... ");
// });

// // Export the Express API
// module.exports = app;

const express = require("express");
const app = express();
const port = 8000;
const usersRoute = require("./users/user.route");
const gameRoute = require("./game/game.route");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./gameRpsSwagger.json");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  return res.json({message: "Hello World"});
});

app.get("/pong", (req, res) => {
  return res.json({message: "PINGGG POING"});
});

app.use("/games", gameRoute);

app.use("/users", usersRoute);

app.listen(port, () => {
  console.log("App is running on port " + port);
});
