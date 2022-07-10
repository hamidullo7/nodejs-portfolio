const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/admin');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.post('/add', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send('Error when validating!');
    }

    if(!await User.find().length === 0) {
        return res.status(400).send('You can\'t add aboutData when there is other data!');
    }

    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);

    let newData = new User({
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });

    newData = await newData.save();
    res.send(_.pick(newData, ['username', 'isAdmin']));
});

router.post('/login', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send('Error when validating!');
    }

    const user = await User.find();
    if(req.body.username !== user[0].username){
        return res.status(400).send('Wrong login or password!');
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

    if(!isValidPassword){
        return res.status(400).send('Wrong login or password!');
    }

    const token = jwt.sign({_id: user[0]._id, isAdmin: user[0].isAdmin}, config.get('jwtPrivateKey'));
    // res.header('x-auth-tok', token).send('Muvaffaqiyatli javob');
    res.send(token);
})

module.exports = router;