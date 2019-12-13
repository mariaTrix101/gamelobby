const express = require('express');
const model = require('./model');
const bcrypt = require('bcrypt');

const auth = require('../../auth');

const router = express.Router();

router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            console.error(err);
            throw err;
        }

        const user = new model({
            email,
            hash
        });
        user.save(err => {
            if (err) {
                console.error(err);
                res.status(400);
                throw err;
            } else {
                const token = auth.createToken(email);
                res.status(200).send({
                    success: true,
                    token: token
                });
            }
        });
    });
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    model.findOne({
        email: { $eq: email },
    }, (err, user) => {
        if (err || !user) {
            console.error(err);
            res.status(400);
            throw err;
        }

        bcrypt.compare(password, user.hash, (err, isValid) => {
            if (!isValid) {
                res.status(400);
            } else {
                const token = auth.createToken(email);
                res.status(200).send({
                    success: true,
                    token: token
                });
            }
        });
    });
});



module.exports = router;
