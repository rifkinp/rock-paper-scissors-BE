const express = require("express");
const app = express();
const port = 8000;
const usersRoute = require('./users/user.route')

app.use(express.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
    return res.sendFile('index.html')
});

// app.get('/game', (req, res) => {
//     return res.sendFile(__dirname + '/public/game.html')
// });

app.get('/pong', (req, res) => {
    return res.json({message: 'PINGGG POING'})
});

app.use('/games', usersRoute);

app.use('/users', usersRoute);

app.listen(port, () => {
    console.log('App is running on port ' + port)
});