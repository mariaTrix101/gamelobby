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
    const gamer = req.body;
    if (!gamer) {
        res.status(400).send({error: 'No gamer'});
        return;
    }
    const gamermodel = new model(gamer);

    gamermodel.save(err => {
        if (err) {
            console.error(err);
            res.status(400).send();
            throw err;
        }
        res.status(200).send(gamermodel);
    });
});


router.post('/edit/:id', auth.validateJwt, (req, res) => {
    const gamer = req.body;

    if (!gamer)
        res.status(400).send();
    else {
        model.findOneAndUpdate({_id: req.params.id}, gamer,
        (err, gamer) => {
            if (err) {
                console.error(err);
                res.status(400).send();
                throw err;
            }
            res.status(200).send(gamer);
        });
    }
});

router.get('/find/:key/:term', auth.validateJwt, (req, res) => {
    const { key, term } = req.params;
    model.find({[key]: new RegExp('^.*'+term+'.*$', "i")}, (err, gamers) => {
        if (err) {
            console.error(err);
            res.status(400).send();
            throw err;
        }
        res.status(200).send({gamers: gamers});
    });
});

router.delete('/delete/:id', auth.validateJwt, (req, res) => {
    const id = req.params.id;
    model.findOneAndDelete({_id: id}, (err, _) => {
        if (err) {
            console.error(err);
            res.status(400).send();
        } else res.status(200).send();
    })
});

module.exports = router;