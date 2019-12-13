const mongoose = require('mongoose');

const mongodb_url = process.env.MONGODB_URL;
mongoose.connect(mongodb_url, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose.model(
    "Gamers", new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        rank: {
            type: String,
            required: true
        },
        score: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        gamePlayed: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    })
);
