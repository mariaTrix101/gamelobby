const fs = require('fs');
const path = require('path');
const jsonwebtoken = require('jsonwebtoken');

const getKey = () => {
    // const keyPath = path.resolve(__dirname) + '/secret.key';
    // return fs.readFileSync(keyPath);
    return 'dev';
};

const createToken = (email) => {
    const key = getKey();
    return jsonwebtoken.sign({email}, key);
};

const validateJwt = (req, res, next) => {
    const errMsg = 'You are unauthorized';
    const auth = req.get('Authorization');

    if (!auth)
        res.status(401).send({error: true, msg: errMsg});

    try {
        const jwt = auth.split(' ')[1];
        const key = getKey();
        jsonwebtoken.verify(jwt, key);
    } catch(e) {
        console.error(e);
        return res.status(401).send({error: true, msg: errMsg});
    }
    next();
};

module.exports = {
    validateJwt,
    createToken
};