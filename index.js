const express = require('express');
const cors = require('cors');
const userRouter = require('./user/user.route');

const app = express();

require('dotenv').config();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', userRouter);

module.exports = app;
