const express = require('express');
const model = require('./model');
const auth = require('../../auth');

const router = express.Router();

router.get('/', auth.validateJwt, (req, res) => {
    model.find({}, (err, values) => {
        if (err) { 
            console.error(err);
            res.status(400).send();
            throw err;
        }

        res.status(200).send({ values });
    })
});

router.post('/new', auth.validateJwt, (req, res) => {
    if (!req.body) {
        res.status(400).send({error: 'No game'});
        return;
    }
    const game = new model(req.body);

    game.save(err => {
        if (err) {
            console.error(err);
            res.status(400);
        } else
            res.status(200).send(game);
    });
});

router.post('/edit/:id', auth.validateJwt, (req, res) => {
    const game = req.body;

    if (!game)
        res.status(400).send();
    else {
        model.findOneAndUpdate({_id: req.params.id}, game, (err, game) => {
            if (err) {
                console.error(err);
                res.status(400).send();
                throw err;
            }
            res.status(200).send(game);
        });
    }
});

router.get('/find/:key/:term', auth.validateJwt, (req, res) => {
    const { key, term } = req.params;
    model.find({[key]: new RegExp('^.*'+term+'.*$', "i")}, (err, games) => {
        if (err) {
            console.error(err);
            res.status(400).send();
            throw err;
        }
        res.status(200).send({games});
    });
});


router.delete('/delete/:id', auth.validateJwt, (req, res) => {
    const id = req.params.id;
    model.findOneAndDelete({_id: id}, (err, _) => {
        if (err) {
            console.error(err);
            res.status(400).send();
            throw err;
        }
        res.status(200).send();
    })
});


module.exports = router;
