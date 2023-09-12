const express = require('express');
const cors = require('cors');
const userRouter = require('./user/user.route');
const port = 3004;

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
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
