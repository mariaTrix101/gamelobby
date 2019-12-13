const mongoose = require('mongoose');

const mongodb_url = process.env.MONGODB_URL;
mongoose.connect(mongodb_url, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose.model(
    "Games", new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        platform: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        publisher: {
            type: String,
            required: true
        },
        release: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    })
);
