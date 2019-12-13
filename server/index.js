require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require('./app/users/routes');
const gameRoutes = require('./app/games/routes');
const gamerRoutes = require('./app/gamers/routes');

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/gamers', gamerRoutes);
app.listen(port, () => console.log(`Server is started on localhost:${port}`));
