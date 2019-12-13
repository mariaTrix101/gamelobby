const mongoose = require('mongoose');

const mongodb_url = process.env.MONGODB_URL;
mongoose.connect(mongodb_url, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose.model(
    "Users", mongoose.Schema({
        email: {
            type: String,
            unique: true,
            required: true
        },
        hash: {
            type: String,
            required: true
        }
    })
);
